import { supabase, getCurrentUser } from './supabase-client.js'

const AVATAR_BUCKET = 'avatars'
const MAX_AVATAR_SIZE = 500 * 1024
const MAX_NICKNAME_LENGTH = 32
const AVATAR_OUTPUT_SIZE = 512

function normalizeNickname(nickname) {
  return nickname.trim().replace(/\s+/g, ' ').slice(0, MAX_NICKNAME_LENGTH)
}

function getAvatarExtension(file) {
  const extensionFromName = file.name.split('.').pop()?.toLowerCase()
  if (extensionFromName && extensionFromName.length <= 5) {
    return extensionFromName
  }

  const mimeExtension = file.type.split('/').pop()?.toLowerCase()
  return mimeExtension || 'png'
}

export function validateAvatarFile(file) {
  if (!file) {
    return {
      success: false,
      error: 'Please choose an image file.',
    }
  }

  if (!file.type.startsWith('image/')) {
    return {
      success: false,
      error: 'Avatar must be an image file.',
    }
  }

  return {
    success: true,
  }
}

function normalizeProfileRow(profileRow, user) {
  return {
    id: profileRow?.id || user.id,
    email: profileRow?.email || user.email || '',
    nickname: profileRow?.nickname || '',
    avatar_url: profileRow?.avatar_url || '',
    role: profileRow?.role || 'user',
  }
}

async function upsertProfileFromUser(user, overrides = {}) {
  const profileRow = normalizeProfileRow(overrides, user)
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profileRow, { onConflict: 'id' })
    .select('id, email, nickname, avatar_url, role')
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    profile: data,
  }
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Unable to read the selected avatar image.'))
    }

    image.src = objectUrl
  })
}

async function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to process avatar image.'))
          return
        }

        resolve(blob)
      },
      mimeType,
      quality,
    )
  })
}

export async function createCroppedAvatarFile(file) {
  const validation = validateAvatarFile(file)
  if (!validation.success) {
    return validation
  }

  const image = await loadImageFromFile(file)
  const sourceSize = Math.min(image.width, image.height)
  const sourceX = Math.floor((image.width - sourceSize) / 2)
  const sourceY = Math.floor((image.height - sourceSize) / 2)

  const canvas = document.createElement('canvas')
  canvas.width = AVATAR_OUTPUT_SIZE
  canvas.height = AVATAR_OUTPUT_SIZE

  const context = canvas.getContext('2d')
  if (!context) {
    return {
      success: false,
      error: 'Unable to process avatar image.',
    }
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    AVATAR_OUTPUT_SIZE,
    AVATAR_OUTPUT_SIZE,
  )

  const mimeType = 'image/jpeg'
  const qualitySteps = [0.92, 0.82, 0.72, 0.62]

  for (const quality of qualitySteps) {
    const blob = await canvasToBlob(canvas, mimeType, quality)

    if (blob.size <= MAX_AVATAR_SIZE || quality === qualitySteps[qualitySteps.length - 1]) {
      const croppedFile = new File([blob], `${file.name.replace(/\.[^.]+$/, '') || 'avatar'}.jpg`, {
        type: mimeType,
        lastModified: Date.now(),
      })

      if (croppedFile.size > MAX_AVATAR_SIZE) {
        return {
          success: false,
          error: 'Avatar must be 500KB or smaller after cropping.',
        }
      }

      return {
        success: true,
        file: croppedFile,
      }
    }
  }

  return {
    success: false,
    error: 'Avatar must be 500KB or smaller after cropping.',
  }
}

export async function getProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'You need to sign in to view your profile.',
    }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nickname, avatar_url, role')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  if (!data) {
    const createdProfile = await upsertProfileFromUser(user, {
      id: user.id,
      email: user.email || '',
      nickname: user.user_metadata?.nickname || '',
      avatar_url: user.user_metadata?.avatar_url || '',
      role: user.user_metadata?.role || user.app_metadata?.role || 'user',
    })

    if (!createdProfile.success) {
      return createdProfile
    }

    return {
      success: true,
      user,
      profile: createdProfile.profile,
    }
  }

  return {
    success: true,
    user,
    profile: data,
  }
}

export async function saveProfile({ nickname, avatarFile }) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'You need to sign in to update your profile.',
    }
  }

  const normalizedNickname = normalizeNickname(nickname || '')

  if (!normalizedNickname) {
    return {
      success: false,
      error: 'Please enter a nickname.',
    }
  }

  if (normalizedNickname.length < 2) {
    return {
      success: false,
      error: 'Nickname must be at least 2 characters long.',
    }
  }

  const currentProfileResult = await getProfile()
  if (!currentProfileResult.success) {
    return currentProfileResult
  }

  const nextProfileData = {
    id: user.id,
    email: user.email || currentProfileResult.profile.email || '',
    nickname: normalizedNickname,
    avatar_url: currentProfileResult.profile.avatar_url || '',
    role: currentProfileResult.profile.role || 'user',
  }

  if (avatarFile) {
    const preparedAvatar = await createCroppedAvatarFile(avatarFile)
    if (!preparedAvatar.success) {
      return preparedAvatar
    }

    const filePath = `${user.id}/avatar-${Date.now()}.${getAvatarExtension(preparedAvatar.file)}`
    const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, preparedAvatar.file, {
      cacheControl: '3600',
      upsert: true,
      contentType: preparedAvatar.file.type,
    })

    if (uploadError) {
      return {
        success: false,
        error: uploadError.message,
      }
    }

    const { data: publicUrlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath)
    nextProfileData.avatar_url = publicUrlData.publicUrl
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(nextProfileData, { onConflict: 'id' })
    .select('id, email, nickname, avatar_url, role')
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  const authUpdate = await supabase.auth.updateUser({
    data: {
      nickname: data.nickname,
      avatar_url: data.avatar_url,
      role: data.role,
    },
  })

  if (authUpdate.error) {
    return {
      success: false,
      error: authUpdate.error.message,
    }
  }

  return {
    success: true,
    user: authUpdate.data.user,
    message: 'Profile updated successfully.',
  }
}

export async function listProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, nickname, avatar_url, role, created_at, updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    profiles: data || [],
  }
}

export async function saveProfileRecord(profile) {
  const payload = {
    id: profile.id,
    email: profile.email || '',
    nickname: profile.nickname || '',
    avatar_url: profile.avatar_url || '',
    role: profile.role || 'user',
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select('id, email, nickname, avatar_url, role, created_at, updated_at')
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    profile: data,
  }
}

export async function deleteProfileRecord(profileId) {
  const { error } = await supabase.from('profiles').delete().eq('id', profileId)

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

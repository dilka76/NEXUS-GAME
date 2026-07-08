import { supabase, getCurrentUser } from './supabase-client.js'

const AVATAR_BUCKET = 'avatars'
const MAX_AVATAR_SIZE = 500 * 1024
const MAX_NICKNAME_LENGTH = 32

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

  if (file.size > MAX_AVATAR_SIZE) {
    return {
      success: false,
      error: 'Avatar must be 500KB or smaller.',
    }
  }

  return {
    success: true,
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

  return {
    success: true,
    user,
    profile: {
      nickname: user.user_metadata?.nickname || '',
      avatarUrl: user.user_metadata?.avatar_url || '',
    },
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

  const nextProfileData = {
    nickname: normalizedNickname,
  }

  if (avatarFile) {
    const avatarValidation = validateAvatarFile(avatarFile)
    if (!avatarValidation.success) {
      return avatarValidation
    }

    const filePath = `${user.id}/avatar-${Date.now()}.${getAvatarExtension(avatarFile)}`
    const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: true,
      contentType: avatarFile.type,
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

  const { data, error } = await supabase.auth.updateUser({
    data: nextProfileData,
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    user: data.user,
    message: 'Profile updated successfully.',
  }
}

import './profile.css'
import { navigateTo } from '../../router.js'
import { getProfile, saveProfile, validateAvatarFile } from '../../services/profile.js'

function getInitials(nickname, email) {
  const source = nickname || email || 'Player'
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export async function renderProfilePage() {
  const profileResult = await getProfile()

  if (!profileResult.success) {
    return `
      <section class="container-xxl py-4 py-lg-5">
        <div class="surface rounded-4 p-4 p-lg-5 text-center profile-empty-state fade-in-up">
          <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Profile</span>
          <h1 class="h3 fw-bold section-heading mb-3">Sign in required</h1>
          <p class="muted-text mb-4">${profileResult.error}</p>
          <a class="btn btn-accent rounded-pill px-4" href="/login" data-link>Go to login</a>
        </div>
      </section>
    `
  }

  const { user, profile } = profileResult
  const initials = getInitials(profile.nickname, user.email)

  return `
    <section class="container-xxl py-4 py-lg-5 fade-in-up">
      <div class="row justify-content-center g-4">
        <div class="col-12 col-xl-10">
          <div class="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
            <div>
              <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Profile</span>
              <h1 class="h2 fw-bold section-heading mb-2">Player identity</h1>
              <p class="muted-text mb-0">Customize the name and avatar that other players see.</p>
            </div>
            <a class="btn btn-outline-light rounded-pill px-4" href="/dashboard" data-link>Back to dashboard</a>
          </div>

          <div class="row g-4 align-items-stretch">
            <div class="col-lg-5">
              <div class="surface rounded-4 p-4 p-lg-5 h-100 profile-summary-panel">
                <div class="profile-avatar-frame mx-auto mb-4" id="avatarPreviewFrame">
                  ${profile.avatarUrl ? `<img src="${profile.avatarUrl}" alt="Avatar preview" class="profile-avatar-image" id="avatarPreviewImage" />` : `<span class="profile-avatar-initials" id="avatarPreviewInitials">${initials}</span>`}
                </div>

                <div class="text-center">
                  <h2 class="h4 fw-bold mb-2" id="profileNicknameDisplay">${profile.nickname || 'Player'}</h2>
                  <p class="muted-text mb-3">${user.email}</p>
                  <div class="d-flex flex-wrap justify-content-center gap-2">
                    <span class="badge text-bg-dark rounded-pill px-3 py-2">Signed in</span>
                    <span class="badge text-bg-dark rounded-pill px-3 py-2">Avatar ready</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <div class="surface rounded-4 p-4 p-lg-5 h-100">
                <form id="profileForm" class="profile-form">
                  <div class="form-group mb-4">
                    <label for="nicknameInput" class="form-label">
                      <span class="form-label-icon">✦</span> Nickname
                    </label>
                    <input
                      type="text"
                      id="nicknameInput"
                      class="form-control form-control-lg"
                      placeholder="Enter your nickname"
                      minlength="2"
                      maxlength="32"
                      value="${profile.nickname}"
                      required
                    />
                    <small class="form-hint">Use 2 to 32 characters.</small>
                  </div>

                  <div class="form-group mb-4">
                    <label for="avatarInput" class="form-label">
                      <span class="form-label-icon">🖼</span> Avatar image
                    </label>
                    <input
                      type="file"
                      id="avatarInput"
                      class="form-control form-control-lg"
                      accept="image/*"
                    />
                    <small class="form-hint">PNG, JPG, WebP, or GIF up to 500KB.</small>
                  </div>

                  <div class="profile-message profile-message-error" id="profileError"></div>
                  <div class="profile-message profile-message-success" id="profileSuccess"></div>

                  <div class="d-flex flex-column flex-sm-row gap-3">
                    <button type="submit" class="btn btn-accent btn-lg rounded-pill px-4" id="saveProfileBtn">
                      Save profile
                    </button>
                    <button type="button" class="btn btn-outline-light btn-lg rounded-pill px-4" id="resetProfileBtn">
                      Reset form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

export function attachProfilePageListeners() {
  const profileForm = document.getElementById('profileForm')
  const nicknameInput = document.getElementById('nicknameInput')
  const avatarInput = document.getElementById('avatarInput')
  const profileError = document.getElementById('profileError')
  const profileSuccess = document.getElementById('profileSuccess')
  const saveProfileBtn = document.getElementById('saveProfileBtn')
  const resetProfileBtn = document.getElementById('resetProfileBtn')
  const avatarPreviewFrame = document.getElementById('avatarPreviewFrame')
  const profileNicknameDisplay = document.getElementById('profileNicknameDisplay')

  if (!profileForm || !nicknameInput || !avatarInput) {
    return
  }

  let previewObjectUrl = ''

  avatarInput.addEventListener('change', () => {
    clearMessages()

    const file = avatarInput.files?.[0]
    if (!file) {
      restoreAvatarPreview()
      return
    }

    const validation = validateAvatarFile(file)
    if (!validation.success) {
      showError(validation.error)
      avatarInput.value = ''
      restoreAvatarPreview()
      return
    }

    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl)
    }

    previewObjectUrl = URL.createObjectURL(file)
    avatarPreviewFrame.innerHTML = `<img src="${previewObjectUrl}" alt="Avatar preview" class="profile-avatar-image" id="avatarPreviewImage" />`
  })

  resetProfileBtn?.addEventListener('click', () => {
    clearMessages()
    nicknameInput.value = nicknameInput.defaultValue
    avatarInput.value = ''
    restoreAvatarPreview()
    profileNicknameDisplay.textContent = nicknameInput.defaultValue || 'Player'
  })

  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    clearMessages()

    const avatarFile = avatarInput.files?.[0] || null
    const nickname = nicknameInput.value

    const validation = avatarFile ? validateAvatarFile(avatarFile) : { success: true }
    if (!validation.success) {
      showError(validation.error)
      return
    }

    saveProfileBtn.disabled = true
    saveProfileBtn.textContent = 'Saving...'

    const result = await saveProfile({ nickname, avatarFile })

    if (result.success) {
      showSuccess(result.message || 'Profile updated successfully.')
      profileNicknameDisplay.textContent = nicknameInput.value.trim() || 'Player'
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1200)
    } else {
      showError(result.error || 'Could not update profile.')
      saveProfileBtn.disabled = false
      saveProfileBtn.textContent = 'Save profile'
    }
  })

  function restoreAvatarPreview() {
    const currentImage = document.getElementById('avatarPreviewImage')
    if (currentImage) {
      currentImage.remove()
    }

    if (!avatarPreviewFrame.querySelector('.profile-avatar-initials')) {
      const initials = profileNicknameDisplay.textContent?.trim()?.slice(0, 2).toUpperCase() || 'P'
      avatarPreviewFrame.innerHTML = `<span class="profile-avatar-initials" id="avatarPreviewInitials">${initials}</span>`
    }
  }

  function clearMessages() {
    profileError.textContent = ''
    profileError.style.display = 'none'
    profileSuccess.textContent = ''
    profileSuccess.style.display = 'none'
  }

  function showError(message) {
    profileError.textContent = message
    profileError.style.display = 'block'
  }

  function showSuccess(message) {
    profileSuccess.textContent = message
    profileSuccess.style.display = 'block'
  }
}

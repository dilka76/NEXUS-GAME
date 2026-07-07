import './login.css'
import { login, register } from '../../services/auth.js'
import { navigateTo } from '../../router.js'

export function renderLoginPage() {
  return `
    <section class="login-container">
      <div class="login-wrapper">
        <!-- Background Elements -->
        <div class="login-bg-elements">
          <div class="login-bg-shape login-bg-shape-1"></div>
          <div class="login-bg-shape login-bg-shape-2"></div>
          <div class="login-bg-line"></div>
        </div>

        <div class="login-card">
          <!-- Header -->
          <div class="login-header">
            <div class="login-icon">◆</div>
            <h1 class="login-title">NEXUS MILLIONAIRE</h1>
            <p class="login-subtitle">Who Wants to Be a Millionaire?</p>
          </div>

          <!-- Tab Navigation -->
          <div class="login-tabs">
            <button class="login-tab-btn active" id="tabLogin" data-tab="login">
              <span class="tab-icon">▶</span> Sign In
            </button>
            <button class="login-tab-btn" id="tabRegister" data-tab="register">
              <span class="tab-icon">✦</span> Join Game
            </button>
          </div>

          <!-- Messages -->
          <div class="login-message login-message-error" id="errorMessage"></div>
          <div class="login-message login-message-success" id="successMessage"></div>

          <!-- Login Form -->
          <form class="login-form active" id="loginForm">
            <div class="form-group">
              <label for="loginEmail" class="form-label">
                <span class="form-label-icon">📧</span> Email Address
              </label>
              <input
                type="email"
                id="loginEmail"
                class="form-control"
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="loginPassword" class="form-label">
                <span class="form-label-icon">🔐</span> Password
              </label>
              <input
                type="password"
                id="loginPassword"
                class="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <div class="form-options">
              <label class="form-check">
                <input type="checkbox" id="rememberMe" class="form-check-input" />
                <span class="form-check-label">Remember me</span>
              </label>
              <a href="#" class="form-link">Forgot password?</a>
            </div>

            <button type="submit" class="btn-accent btn-submit">
              <span class="btn-icon">▶</span> Sign In Now
            </button>
          </form>

          <!-- Register Form -->
          <form class="login-form" id="registerForm">
            <div class="form-group">
              <label for="registerEmail" class="form-label">
                <span class="form-label-icon">📧</span> Email Address
              </label>
              <input
                type="email"
                id="registerEmail"
                class="form-control"
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="registerPassword" class="form-label">
                <span class="form-label-icon">🔐</span> Create Password
              </label>
              <input
                type="password"
                id="registerPassword"
                class="form-control"
                placeholder="Min. 8 characters"
                required
                minlength="8"
              />
              <small class="form-hint">Must be at least 8 characters long</small>
            </div>

            <div class="form-group">
              <label for="registerConfirmPassword" class="form-label">
                <span class="form-label-icon">✓</span> Confirm Password
              </label>
              <input
                type="password"
                id="registerConfirmPassword"
                class="form-control"
                placeholder="Confirm your password"
                required
                minlength="8"
              />
            </div>

            <label class="form-check">
              <input type="checkbox" id="termsCheckbox" class="form-check-input" required />
              <span class="form-check-label">I agree to the Terms & Conditions</span>
            </label>

            <button type="submit" class="btn-accent btn-submit">
              <span class="btn-icon">✦</span> Create Account
            </button>
          </form>

          <!-- Footer -->
          <div class="login-footer">
            <p class="login-footer-text">
              <span class="footer-icon">⚡</span>
              Secure authentication powered by Supabase
            </p>
          </div>
        </div>
      </div>
    </section>
  `
}

// Attach event listeners after rendering
export function attachLoginPageListeners() {
  const loginForm = document.getElementById('loginForm')
  const registerForm = document.getElementById('registerForm')
  const tabButtons = document.querySelectorAll('.login-tab-btn')
  const errorMessage = document.getElementById('errorMessage')
  const successMessage = document.getElementById('successMessage')

  // Tab switching
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabType = btn.dataset.tab
      
      // Update active tab button
      tabButtons.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      // Update active form
      document.querySelectorAll('.login-form').forEach((form) => form.classList.remove('active'))
      document.getElementById(tabType === 'login' ? 'loginForm' : 'registerForm').classList.add('active')

      // Clear messages
      errorMessage.textContent = ''
      successMessage.textContent = ''
    })
  })

  // Login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    clearMessages()

    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value

    const btn = loginForm.querySelector('.btn-submit')
    btn.disabled = true
    btn.textContent = '▶ Signing in...'

    const result = await login(email, password)

    if (result.success) {
      showSuccess('Login successful! Redirecting to dashboard...')
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1500)
    } else {
      showError(result.error || 'Login failed')
      btn.disabled = false
      btn.textContent = '▶ Sign In Now'
    }
  })

  // Register form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    clearMessages()

    const email = document.getElementById('registerEmail').value
    const password = document.getElementById('registerPassword').value
    const confirmPassword = document.getElementById('registerConfirmPassword').value

    if (password !== confirmPassword) {
      showError('Passwords do not match')
      return
    }

    const btn = registerForm.querySelector('.btn-submit')
    btn.disabled = true
    btn.textContent = '✦ Creating account...'

    const result = await register(email, password)

    if (result.success) {
      showSuccess(result.message || 'Account created successfully!')
      registerForm.reset()
      setTimeout(() => {
        document.getElementById('tabLogin').click()
      }, 2000)
    } else {
      showError(result.error || 'Registration failed')
      btn.disabled = false
      btn.textContent = '✦ Create Account'
    }
  })

  function clearMessages() {
    errorMessage.textContent = ''
    successMessage.textContent = ''
  }

  function showError(message) {
    errorMessage.textContent = message
    errorMessage.style.display = 'block'
  }

  function showSuccess(message) {
    successMessage.textContent = message
    successMessage.style.display = 'block'
  }
}
import './header.css'
import { getCurrentUser } from '../../services/supabase-client.js'
import { logout } from '../../services/auth.js'
import { navigateTo } from '../../router.js'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Game 101', path: '/games/101' },
  { label: 'Login', path: '/login' },
]

function isActiveLink(currentPath, targetPath) {
  if (targetPath === '/') {
    return currentPath === '/'
  }

  if (targetPath.startsWith('/games/')) {
    return currentPath.startsWith('/games/')
  }

  return currentPath === targetPath
}

export async function renderHeader(pathname) {
  const user = await getCurrentUser()

  const links = navItems
    .map((item) => {
      const activeClass = isActiveLink(pathname, item.path) ? 'active' : ''
      const ariaCurrent = isActiveLink(pathname, item.path) ? 'aria-current="page"' : ''

      return `
        <li class="nav-item">
          <a class="nav-link ${activeClass}" href="${item.path}" data-link ${ariaCurrent}>${item.label}</a>
        </li>
      `
    })
    .join('')

  const ctaButtons = user
    ? `
      <div class="d-flex gap-2">
        <span class="navbar-text text-accent me-2">👤 ${user.email}</span>
        <button class="btn btn-outline-light btn-sm rounded-pill px-4" id="logoutBtn">Sign Out</button>
      </div>
    `
    : `
      <div class="d-flex gap-2">
        <a class="btn btn-outline-light btn-sm rounded-pill px-4" href="/login" data-link>Sign In</a>
        <a class="btn btn-accent btn-sm rounded-pill px-4" href="/login" data-link>Play Now</a>
      </div>
    `

  const headerHTML = `
    <header class="app-header sticky-top">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-xxl">
          <a class="navbar-brand d-flex align-items-center gap-2" href="/" data-link>
            <span class="brand-icon">◆</span>
            <span class="brand-text">
              <strong class="d-block">NEXUS MILLIONAIRE</strong>
              <small class="text-uppercase">Who Wants to be a Millionaire</small>
            </span>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primaryNav"
            aria-controls="primaryNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="primaryNav">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
              ${links}
            </ul>

            ${ctaButtons}
          </div>
        </div>
      </nav>
    </header>
  `

  // Return HTML and attach logout listener
  return { html: headerHTML, user }
}

export function attachHeaderListeners() {
  const logoutBtn = document.getElementById('logoutBtn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const result = await logout()
      if (result.success) {
        navigateTo('/')
      }
    })
  }
}
import './header.css'
import { getProfile } from '../../services/profile.js'
import { logout } from '../../services/auth.js'
import { navigateTo } from '../../router.js'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Profile', path: '/profile', requiresUser: true },
  { label: 'Admin', path: '/admin', requiresAdmin: true },
  { label: 'Games', path: '/games' },
  { label: 'Login', path: '/login' },
]

function isActiveLink(currentPath, targetPath) {
  if (targetPath === '/') {
    return currentPath === '/'
  }

  if (targetPath.startsWith('/games')) {
    return currentPath.startsWith('/games') || currentPath.startsWith('/game/')
  }

  if (targetPath === '/profile') {
    return currentPath === '/profile'
  }

  if (targetPath === '/admin') {
    return currentPath === '/admin'
  }

  return currentPath === targetPath
}

export async function renderHeader(pathname) {
  const profileResult = await getProfile()
  const user = profileResult.success ? profileResult.user : null
  const profile = profileResult.success ? profileResult.profile : null
  const isAdmin = profile?.role === 'admin'

  const links = navItems
    .map((item) => {
      if (item.requiresUser && !user) {
        return ''
      }

      if (item.requiresAdmin && !isAdmin) {
        return ''
      }

      // Hide login link if user is logged in
      if (item.path === '/login' && user) {
        return ''
      }

      const activeClass = isActiveLink(pathname, item.path) ? 'active' : ''
      const ariaCurrent = isActiveLink(pathname, item.path) ? 'aria-current="page"' : ''

      return `
        <li class="nav-item">
          <a class="nav-link ${activeClass}" href="${item.path}" data-link ${ariaCurrent}>${item.label}</a>
        </li>
      `
    })
    .filter(Boolean)
    .join('')

  const ctaButtons = user
    ? `
      <div class="d-flex gap-2">
        <a class="navbar-text text-accent me-2 text-decoration-none" href="/profile" data-link>👤 ${profile?.nickname || user.email}</a>
        ${isAdmin ? '<a class="btn btn-outline-light btn-sm rounded-pill px-4" href="/admin" data-link>Admin</a>' : ''}
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
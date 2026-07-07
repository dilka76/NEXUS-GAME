import './header.css'

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

export function renderHeader(pathname) {
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

  return `
    <header class="app-header sticky-top">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-xxl">
          <a class="navbar-brand d-flex align-items-center gap-2" href="/" data-link>
            <span class="brand-mark">N</span>
            <span>
              <strong class="d-block">Nexus Game</strong>
              <small class="text-uppercase text-secondary-emphasis">Bootstrap + Vite</small>
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
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
              ${links}
            </ul>

            <div class="d-flex gap-2">
              <a class="btn btn-outline-light btn-sm rounded-pill px-3" href="/login" data-link>Sign in</a>
              <a class="btn btn-accent btn-sm rounded-pill px-3" href="/dashboard" data-link>Open dashboard</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `
}
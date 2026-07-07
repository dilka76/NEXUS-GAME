import { renderDashboardPage } from './pages/dashboard/dashboard.js'
import { renderGameDetailPage } from './pages/game-detail/game-detail.js'
import { renderHomePage } from './pages/home/home.js'
import { renderLoginPage } from './pages/login/login.js'
import { renderNotFoundPage } from './pages/not-found/not-found.js'

function normalizePath(pathname) {
  if (pathname === '/') {
    return pathname
  }

  return pathname.replace(/\/+$/, '')
}

export function getRoute(pathname) {
  const normalizedPath = normalizePath(pathname)

  if (normalizedPath === '/') {
    return {
      pathname: normalizedPath,
      title: 'Home',
      render: renderHomePage,
    }
  }

  if (normalizedPath === '/login') {
    return {
      pathname: normalizedPath,
      title: 'Login',
      render: renderLoginPage,
    }
  }

  if (normalizedPath === '/dashboard') {
    return {
      pathname: normalizedPath,
      title: 'Dashboard',
      render: renderDashboardPage,
    }
  }

  const gameMatch = normalizedPath.match(/^\/games\/(?<gameId>[^/]+)$/)

  if (gameMatch?.groups?.gameId) {
    return {
      pathname: normalizedPath,
      title: `Game ${gameMatch.groups.gameId}`,
      render: () => renderGameDetailPage(decodeURIComponent(gameMatch.groups.gameId)),
    }
  }

  return {
    pathname: normalizedPath,
    title: 'Not found',
    render: () => renderNotFoundPage(normalizedPath),
  }
}

export function navigateTo(pathname) {
  window.history.pushState({}, '', pathname)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
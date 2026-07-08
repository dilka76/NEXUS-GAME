import { renderDashboardPage } from './pages/dashboard/dashboard.js'
import { renderGameDetailPage } from './pages/game-detail/game-detail.js'
import { renderHomePage } from './pages/home/home.js'
import { renderLoginPage } from './pages/login/login.js'
import { renderProfilePage } from './pages/profile/profile.js'
import { renderAdminPage } from './pages/admin/admin.js'
import { renderNotFoundPage } from './pages/not-found/not-found.js'
import { renderGamesPage } from './pages/games/games.js'
import { renderGameStartPage, startNewGame } from './pages/game-start/game-start.js'
import { renderGamePlayPage } from './pages/game-play/game-play.js'

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

  if (normalizedPath === '/profile') {
    return {
      pathname: normalizedPath,
      title: 'Profile',
      render: renderProfilePage,
    }
  }

  if (normalizedPath === '/admin') {
    return {
      pathname: normalizedPath,
      title: 'Admin',
      render: renderAdminPage,
    }
  }

  if (normalizedPath === '/games') {
    return {
      pathname: normalizedPath,
      title: 'My Games',
      render: renderGamesPage,
    }
  }

  if (normalizedPath === '/game/start') {
    return {
      pathname: normalizedPath,
      title: 'Start Game',
      render: renderGameStartPage,
      onLoad: startNewGame,
    }
  }

  const gamePlayMatch = normalizedPath.match(/^\/game\/(?<gameId>[^/]+)\/play$/)
  if (gamePlayMatch?.groups?.gameId) {
    return {
      pathname: normalizedPath,
      title: 'Playing',
      render: () => renderGamePlayPage(decodeURIComponent(gamePlayMatch.groups.gameId)),
      gameId: decodeURIComponent(gamePlayMatch.groups.gameId),
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
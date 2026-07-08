import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/global.css'

import { renderAppLayout } from './layout/app-layout.js'
import { getRoute, navigateTo } from './router.js'
import { attachLoginPageListeners } from './pages/login/login.js'
import { attachProfilePageListeners } from './pages/profile/profile.js'
import { attachAdminPageListeners } from './pages/admin/admin.js'
import { attachGamesPageListeners } from './pages/games/games.js'
import { attachGamePlayListeners } from './pages/game-play/game-play.js'
import { onAuthStateChange } from './services/supabase-client.js'

const app = document.querySelector('#app')

async function renderApp() {
  const route = getRoute(window.location.pathname)

  document.title = `${route.title} | Nexus Game`
  app.innerHTML = await renderAppLayout({
    pathname: route.pathname,
    content: await route.render(),
  })

  // Attach event listeners based on page
  if (route.pathname === '/login') {
    setTimeout(() => {
      attachLoginPageListeners()
    }, 0)
  }

  if (route.pathname === '/profile') {
    setTimeout(() => {
      attachProfilePageListeners()
    }, 0)
  }

  if (route.pathname === '/admin') {
    setTimeout(() => {
      attachAdminPageListeners()
    }, 0)
  }

  if (route.pathname === '/games') {
    setTimeout(() => {
      attachGamesPageListeners()
    }, 0)
  }

  if (route.gameId) {
    setTimeout(() => {
      attachGamePlayListeners(route.gameId)
    }, 0)
  }

  // Execute onLoad callback if present (for game start page)
  if (route.onLoad) {
    setTimeout(() => {
      route.onLoad()
    }, 100)
  }
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-link]')

  if (!link) {
    return
  }

  const url = new URL(link.href)

  if (url.origin !== window.location.origin) {
    return
  }

  event.preventDefault()
  navigateTo(`${url.pathname}${url.search}${url.hash}`)
})

window.addEventListener('popstate', renderApp)

// Handle auth state changes
onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  if (event === 'SIGNED_OUT') {
    // Redirect to home after logout
    navigateTo('/')
  }
})

renderApp()

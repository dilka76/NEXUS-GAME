import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/global.css'

import { renderAppLayout } from './layout/app-layout.js'
import { getRoute, navigateTo } from './router.js'
import { attachLoginPageListeners } from './pages/login/login.js'
import { onAuthStateChange } from './services/supabase-client.js'

const app = document.querySelector('#app')

async function renderApp() {
  const route = getRoute(window.location.pathname)

  document.title = `${route.title} | Nexus Game`
  app.innerHTML = await renderAppLayout({
    pathname: route.pathname,
    content: route.render(),
  })

  // Attach event listeners for login page
  if (route.pathname === '/login') {
    setTimeout(() => {
      attachLoginPageListeners()
    }, 0)
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

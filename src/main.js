import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/global.css'

import { renderAppLayout } from './layout/app-layout.js'
import { getRoute, navigateTo } from './router.js'

const app = document.querySelector('#app')

function renderApp() {
  const route = getRoute(window.location.pathname)

  document.title = `${route.title} | Nexus Game`
  app.innerHTML = renderAppLayout({
    pathname: route.pathname,
    content: route.render(),
  })
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

renderApp()

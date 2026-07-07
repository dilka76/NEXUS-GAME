import { renderFooter } from '../components/footer/footer.js'
import { renderHeader } from '../components/header/header.js'

export function renderAppLayout({ pathname, content }) {
  return `
    <div class="app-shell d-flex flex-column">
      ${renderHeader(pathname)}
      <main class="app-main flex-grow-1">
        ${content}
      </main>
      ${renderFooter()}
    </div>
  `
}
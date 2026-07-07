import { renderFooter } from '../components/footer/footer.js'
import { renderHeader, attachHeaderListeners } from '../components/header/header.js'

export async function renderAppLayout({ pathname, content }) {
  const headerResult = await renderHeader(pathname)
  const headerHTML = typeof headerResult === 'string' ? headerResult : headerResult.html

  // Use setTimeout to attach listeners after DOM is updated
  setTimeout(() => {
    attachHeaderListeners()
  }, 0)

  return `
    <div class="app-shell d-flex flex-column">
      ${headerHTML}
      <main class="app-main flex-grow-1">
        ${content}
      </main>
      ${renderFooter()}
    </div>
  `
}
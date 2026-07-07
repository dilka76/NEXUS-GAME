import './footer.css'

export function renderFooter() {
  return `
    <footer class="app-footer py-4">
      <div class="container-xxl">
        <div class="footer-card surface rounded-4 px-4 py-3 d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between">
          <p class="mb-0">Nexus Game scaffold built with Vite, JavaScript, HTML, CSS, and Bootstrap 5.</p>
          <p class="mb-0 muted-text">Routes: /, /login, /dashboard, /games/{id}</p>
        </div>
      </div>
    </footer>
  `
}
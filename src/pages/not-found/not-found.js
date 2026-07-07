import './not-found.css'

export function renderNotFoundPage(pathname) {
  return `
    <section class="container-xxl fade-in-up">
      <div class="surface rounded-5 p-4 p-lg-5 text-center not-found-card">
        <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">404</span>
        <h1 class="display-6 fw-bold section-heading mb-3">Route not found</h1>
        <p class="lead muted-text mb-4">No page matched <strong>${pathname}</strong>.</p>
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <a class="btn btn-accent rounded-pill px-4" href="/" data-link>Go home</a>
          <a class="btn btn-outline-light rounded-pill px-4" href="/dashboard" data-link>Open dashboard</a>
        </div>
      </div>
    </section>
  `
}
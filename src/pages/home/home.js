import './home.css'

export function renderHomePage() {
  return `
    <section class="container-xxl fade-in-up">
      <div class="hero-panel surface rounded-5 p-4 p-lg-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Home</span>
            <h1 class="display-4 fw-bold section-heading mb-3">Hello world!</h1>
            <p class="lead muted-text mb-4">
              This is the empty homepage for the Nexus Game scaffold. It is ready for modular pages,
              Bootstrap components, and route-based navigation.
            </p>
            <div class="d-flex flex-wrap gap-2">
              <a class="btn btn-accent btn-lg rounded-pill px-4" href="/dashboard" data-link>Go to dashboard</a>
              <a class="btn btn-outline-light btn-lg rounded-pill px-4" href="/games/101" data-link>View game 101</a>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="home-card rounded-4 p-4 soft-border">
              <p class="text-uppercase muted-text small mb-2">Scaffold status</p>
              <div class="d-flex flex-column gap-3">
                <div>
                  <div class="d-flex justify-content-between small mb-2">
                    <span>Routing</span>
                    <span class="accent-text fw-semibold">Ready</span>
                  </div>
                  <div class="progress" role="progressbar" aria-label="Routing ready" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" style="width: 100%"></div>
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-6">
                    <div class="mini-stat rounded-4 p-3">
                      <p class="mb-1 muted-text small">Components</p>
                      <strong>Header, footer, pages</strong>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mini-stat rounded-4 p-3">
                      <p class="mb-1 muted-text small">Stack</p>
                      <strong>Vite + Bootstrap</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
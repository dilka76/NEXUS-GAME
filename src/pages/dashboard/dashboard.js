import './dashboard.css'

const stats = [
  { label: 'Active rooms', value: '18', detail: '+6 today' },
  { label: 'Queued matches', value: '42', detail: 'Peak at 9 PM' },
  { label: 'Online players', value: '1,284', detail: 'Across all modes' },
]

const activities = [
  'Matchmaking service scaled to the current queue.',
  'A new event card was added to the featured games panel.',
  'Login and game detail routes are ready for interaction design.',
]

export function renderDashboardPage() {
  return `
    <section class="container-xxl fade-in-up">
      <div class="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
        <div>
          <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Dashboard</span>
          <h1 class="h2 fw-bold section-heading mb-2">Control center</h1>
          <p class="muted-text mb-0">A Bootstrap-based dashboard scaffold with cards, stats, and activity.</p>
        </div>
        <a class="btn btn-outline-light rounded-pill px-4" href="/games/204" data-link>Open featured game</a>
      </div>

      <div class="row g-3 g-lg-4 mb-4">
        ${stats
          .map(
            (stat) => `
              <div class="col-md-4">
                <div class="surface rounded-4 p-4 stat-card h-100">
                  <p class="muted-text text-uppercase small mb-2">${stat.label}</p>
                  <div class="d-flex align-items-end justify-content-between gap-3">
                    <strong class="display-6 fw-bold mb-0">${stat.value}</strong>
                    <span class="badge text-bg-dark rounded-pill">${stat.detail}</span>
                  </div>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>

      <div class="row g-3 g-lg-4">
        <div class="col-lg-7">
          <div class="surface rounded-4 p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 mb-0">Recent activity</h2>
              <span class="badge text-bg-success rounded-pill">Updated now</span>
            </div>
            <div class="list-group list-group-flush activity-list">
              ${activities
                .map(
                  (activity, index) => `
                    <div class="list-group-item bg-transparent text-light px-0 py-3">
                      <div class="d-flex gap-3 align-items-start">
                        <span class="activity-step">0${index + 1}</span>
                        <p class="mb-0 muted-text">${activity}</p>
                      </div>
                    </div>
                  `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="surface rounded-4 p-4 h-100">
            <h2 class="h5 mb-3">Quick actions</h2>
            <div class="d-grid gap-2">
              <a class="btn btn-accent rounded-pill" href="/login" data-link>Review sign-in flow</a>
              <a class="btn btn-outline-light rounded-pill" href="/games/307" data-link>Inspect beta game</a>
              <a class="btn btn-outline-light rounded-pill" href="/" data-link>Return to home</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
import { games } from '../../data/games.js'
import './game-detail.css'

function renderNotFound(gameId) {
  return `
    <div class="surface rounded-5 p-4 p-lg-5 text-center">
      <h1 class="h2 fw-bold mb-3">Game not found</h1>
      <p class="muted-text mb-4">There is no game with the id <strong>${gameId}</strong> in the demo data.</p>
      <a class="btn btn-accent rounded-pill px-4" href="/dashboard" data-link>Back to dashboard</a>
    </div>
  `
}

export function renderGameDetailPage(gameId) {
  const game = games.find((item) => item.id === String(gameId))

  if (!game) {
    return `
      <section class="container-xxl fade-in-up">
        ${renderNotFound(gameId)}
      </section>
    `
  }

  return `
    <section class="container-xxl fade-in-up">
      <div class="surface rounded-5 p-4 p-lg-5 overflow-hidden game-panel">
        <div class="row g-4 align-items-center">
          <div class="col-lg-8">
            <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Game ${game.id}</span>
            <h1 class="display-5 fw-bold section-heading mb-3">${game.title}</h1>
            <p class="lead muted-text mb-4">${game.summary}</p>

            <div class="d-flex flex-wrap gap-2 mb-4">
              <span class="badge rounded-pill text-bg-success">${game.status}</span>
              <span class="badge rounded-pill text-bg-dark">${game.genre}</span>
              <span class="badge rounded-pill text-bg-secondary">${game.players}</span>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <a class="btn btn-accent rounded-pill px-4" href="/login" data-link>Join now</a>
              <a class="btn btn-outline-light rounded-pill px-4" href="/dashboard" data-link>Open dashboard</a>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="info-stack d-grid gap-3">
              <div class="rounded-4 p-4 soft-border">
                <p class="muted-text text-uppercase small mb-1">Release</p>
                <strong class="fs-4">${game.release}</strong>
              </div>
              <div class="rounded-4 p-4 soft-border">
                <p class="muted-text text-uppercase small mb-1">Mode</p>
                <strong class="fs-4">${game.genre}</strong>
              </div>
              <div class="rounded-4 p-4 soft-border">
                <p class="muted-text text-uppercase small mb-1">Players</p>
                <strong class="fs-4">${game.players}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
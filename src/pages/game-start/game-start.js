import './game-start.css'
import { createGameSession } from '../../services/games.js'
import { navigateTo } from '../../router.js'

export async function renderGameStartPage() {
  return `
    <section class="game-start-container">
      <div class="start-wrapper">
        <div class="start-card">
          <div class="start-icon">◆</div>
          <h1 class="start-title">Initializing Game</h1>
          <p class="start-text">Preparing your challenge...</p>
          <div class="loading-bar">
            <div class="loading-progress"></div>
          </div>
        </div>
      </div>
    </section>
  `
}

export async function startNewGame() {
  const result = await createGameSession()

  if (result.success) {
    // Redirect to game play page
    navigateTo(`/game/${result.gameSession.id}/play`)
  } else {
    alert('Failed to start game: ' + result.error)
    navigateTo('/dashboard')
  }
}

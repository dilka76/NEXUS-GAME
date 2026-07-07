import './games.css'
import { getUserGames, deleteGameSession } from '../../services/games.js'
import { navigateTo } from '../../router.js'

export async function renderGamesPage() {
  const result = await getUserGames()

  if (!result.success) {
    return `
      <section class="games-container">
        <div class="games-error">
          <p>${result.error}</p>
          <a href="/" data-link class="btn-accent">Return Home</a>
        </div>
      </section>
    `
  }

  const games = result.games || []

  const gamesTableHTML =
    games.length === 0
      ? `
        <div class="games-empty">
          <div class="empty-icon">🎮</div>
          <h2>No games yet</h2>
          <p>Start your first game to climb the prize ladder!</p>
        </div>
      `
      : `
        <div class="games-table-wrapper">
          <table class="games-table">
            <thead>
              <tr>
                <th>Started</th>
                <th>Level Reached</th>
                <th>Prize Won</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${games
                .map((game) => {
                  const startDate = new Date(game.started_at)
                  const endDate = game.ended_at ? new Date(game.ended_at) : new Date()
                  const duration = Math.round((endDate - startDate) / 1000 / 60) // minutes

                  return `
                <tr class="game-row" data-game-id="${game.id}">
                  <td>${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}</td>
                  <td class="level-badge">Level ${game.current_level}</td>
                  <td class="prize-cell">$${game.prize_won || 0}</td>
                  <td>${duration} min</td>
                  <td><span class="status-badge status-${game.status}">${game.status}</span></td>
                  <td class="actions-cell">
                    <button class="action-btn play-btn" data-action="play" data-game-id="${game.id}">Play</button>
                    <button class="action-btn delete-btn" data-action="delete" data-game-id="${game.id}">Delete</button>
                  </td>
                </tr>
              `
                })
                .join('')}
            </tbody>
          </table>
        </div>
      `

  return `
    <section class="games-container">
      <div class="games-wrapper">
        <!-- Header -->
        <div class="games-header">
          <div class="games-title-section">
            <h1 class="games-title">My Games</h1>
            <p class="games-subtitle">Track your progress and climb the prize ladder</p>
          </div>
          <a href="/game/start" data-link class="btn-accent btn-new-game">
            <span class="btn-icon">▶</span> Start New Game
          </a>
        </div>

        <!-- Stats -->
        <div class="games-stats">
          <div class="stat-card">
            <div class="stat-label">Total Games</div>
            <div class="stat-value">${games.length}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Highest Level</div>
            <div class="stat-value">${games.length > 0 ? Math.max(...games.map((g) => g.current_level)) : 0}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Total Winnings</div>
            <div class="stat-value">$${games.reduce((sum, g) => sum + (g.prize_won || 0), 0).toLocaleString()}</div>
          </div>
        </div>

        <!-- Games Table -->
        <div class="games-content">
          ${gamesTableHTML}
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="delete-modal" id="deleteModal">
        <div class="modal-backdrop" id="modalBackdrop"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Delete Game?</h2>
          </div>
          <p class="modal-text">Are you sure you want to delete this game? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="modal-btn cancel-btn" id="cancelBtn">Cancel</button>
            <button class="modal-btn confirm-btn" id="confirmBtn">Delete</button>
          </div>
        </div>
      </div>
    </section>
  `
}

export function attachGamesPageListeners() {
  const playBtns = document.querySelectorAll('[data-action="play"]')
  const deleteBtns = document.querySelectorAll('[data-action="delete"]')
  const deleteModal = document.getElementById('deleteModal')
  
  // Return early if no modal (error state)
  if (!deleteModal) {
    return
  }

  const modalBackdrop = document.getElementById('modalBackdrop')
  const cancelBtn = document.getElementById('cancelBtn')
  const confirmBtn = document.getElementById('confirmBtn')

  let pendingDeleteId = null

  // Play game
  playBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.gameId
      navigateTo(`/game/${gameId}/play`)
    })
  })

  // Delete game
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pendingDeleteId = btn.dataset.gameId
      deleteModal.classList.add('active')
    })
  })

  // Modal close
  modalBackdrop.addEventListener('click', () => {
    deleteModal.classList.remove('active')
    pendingDeleteId = null
  })

  cancelBtn.addEventListener('click', () => {
    deleteModal.classList.remove('active')
    pendingDeleteId = null
  })

  // Confirm delete
  confirmBtn.addEventListener('click', async () => {
    if (pendingDeleteId) {
      confirmBtn.disabled = true
      confirmBtn.textContent = 'Deleting...'

      const result = await deleteGameSession(pendingDeleteId)

      if (result.success) {
        deleteModal.classList.remove('active')
        // Reload games list
        window.location.reload()
      } else {
        alert('Failed to delete game: ' + result.error)
        confirmBtn.disabled = false
        confirmBtn.textContent = 'Delete'
      }
    }
  })
}

import './game-play.css'
import { getGameSession, getQuestionForLevel, submitAnswer, updateGameLevel, endGameSession } from '../../services/games.js'
import { navigateTo } from '../../router.js'

export async function renderGamePlayPage(gameId) {
  const result = await getGameSession(gameId)

  if (!result.success) {
    return `
      <section class="game-error">
        <div class="error-content">
          <h2>Game Not Found</h2>
          <p>${result.error}</p>
          <a href="/games" data-link class="btn-accent">Back to Games</a>
        </div>
      </section>
    `
  }

  const gameSession = result.gameSession
  const currentLevel = gameSession.current_level

  // Get question for current level
  const questionResult = await getQuestionForLevel(currentLevel)

  if (!questionResult.success) {
    return `
      <section class="game-error">
        <div class="error-content">
          <h2>No Questions Available</h2>
          <p>${questionResult.error}</p>
          <a href="/games" data-link class="btn-accent">Back to Games</a>
        </div>
      </section>
    `
  }

  const question = questionResult.question
  const answers = questionResult.answers

  // Shuffle answers
  const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5)

  // Prize amounts for each level (hardcoded for 15 levels)
  const prizes = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000,
  ]

  return `
    <section class="game-play-container">
      <!-- Game Header -->
      <div class="game-header">
        <div class="game-info">
          <div class="game-level">
            <span class="level-label">Level</span>
            <span class="level-value">${currentLevel}</span>
          </div>
          <div class="game-prize">
            <span class="prize-label">Prize at Stake</span>
            <span class="prize-value">$${prizes[currentLevel - 1]?.toLocaleString() || '0'}</span>
          </div>
        </div>
        <button class="btn-quit" id="quitBtn">Quit Game</button>
      </div>

      <!-- Prize Ladder -->
      <div class="prize-ladder">
        ${prizes
          .map(
            (prize, idx) => `
          <div class="ladder-item ${idx + 1 === currentLevel ? 'current' : ''} ${idx + 1 < currentLevel ? 'passed' : ''}">
            <span class="ladder-level">${idx + 1}</span>
            <span class="ladder-prize">$${prize.toLocaleString()}</span>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- Question Section -->
      <div class="game-main">
        <div class="question-section">
          <h2 class="question-text">${question.question_text}</h2>

          <!-- Lifelines -->
          <div class="lifelines">
            <button class="lifeline-btn" id="lifelineHalf" title="Remove 2 incorrect answers">
              <span class="lifeline-icon">50:50</span>
            </button>
            <button class="lifeline-btn" id="lifelinePhone" title="Call a friend">
              <span class="lifeline-icon">☎</span>
            </button>
            <button class="lifeline-btn" id="lifelineAudience" title="Ask the audience">
              <span class="lifeline-icon">👥</span>
            </button>
          </div>

          <!-- Answers -->
          <div class="answers-grid">
            ${shuffledAnswers
              .map(
                (answer, idx) => `
              <button class="answer-btn" data-answer-id="${answer.id}" data-is-correct="${answer.is_correct}">
                <span class="answer-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="answer-text">${answer.answer_text}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Side Info -->
        <div class="game-sidebar">
          <div class="question-number">
            <div class="qn-label">Question</div>
            <div class="qn-value">${currentLevel}</div>
          </div>
          <div class="game-controls">
            <button class="btn-next-level" id="nextBtn" style="display: none;">
              <span>Next Level</span>
              <span>▶</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
}

export function attachGamePlayListeners(gameId) {
  const answerBtns = document.querySelectorAll('.answer-btn')
  const quitBtn = document.getElementById('quitBtn')
  const nextBtn = document.getElementById('nextBtn')
  const lifelineBtns = document.querySelectorAll('.lifeline-btn')

  let answered = false
  let selectedAnswer = null

  // Answer selection
  answerBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (answered) return

      answered = true
      selectedAnswer = btn

      const rawValue = btn.getAttribute('data-is-correct')
      const isCorrect = btn.dataset.isCorrect === 'true'
      console.log('Button clicked:', btn.textContent.trim(), 'Raw:', rawValue, 'isCorrect:', isCorrect)

      // Highlight selected answer
      answerBtns.forEach((b) => b.classList.remove('selected', 'correct', 'incorrect'))
      btn.classList.add('selected')

      // Show correct/incorrect
      if (isCorrect) {
        btn.classList.add('correct')
        // Show next level button after a delay
        setTimeout(() => {
          nextBtn.style.display = 'flex'
        }, 800)
      } else {
        btn.classList.add('incorrect')
        // Find and show correct answer
        answerBtns.forEach((b) => {
          if (b.dataset.isCorrect === 'true') {
            b.classList.add('correct')
          }
        })

        // Game Over after a delay
        setTimeout(() => {
          endGame(gameId, false)
        }, 2000)
      }
    })
  })

  // Next level
  nextBtn.addEventListener('click', async () => {
    nextBtn.disabled = true
    const gameResult = await getGameSession(gameId)
    const newLevel = gameResult.gameSession.current_level + 1

    if (newLevel > 15) {
      // Won the game!
      endGame(gameId, true)
    } else {
      // Update level and reload
      await updateGameLevel(gameId, newLevel)
      window.location.reload()
    }
  })

  // Quit game
  quitBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to quit? Your progress will be saved.')) {
      endGame(gameId, false)
    }
  })

  // Lifelines
  lifelineBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      alert('Lifeline feature coming soon!')
    })
  })
}

async function endGame(gameId, won) {
  const gameResult = await getGameSession(gameId)
  const currentLevel = gameResult.gameSession.current_level
  const prizes = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000,
  ]
  const prizeWon = prizes[won ? currentLevel - 1 : Math.max(0, currentLevel - 1)] || 0

  await endGameSession(gameId, currentLevel, prizeWon)

  if (won) {
    alert(`🎉 Congratulations! You won $${prizeWon.toLocaleString()}!`)
  } else {
    alert(`Game Over! You won $${prizeWon.toLocaleString()}`)
  }

  navigateTo('/games')
}

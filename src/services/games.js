import { supabase } from './supabase-client.js'
import { getCurrentUser } from './supabase-client.js'

// Prize ladder for 15 levels
const PRIZE_LADDER = [
  100, 200, 300, 500, 1000, 2000, 4000, 8000,
  16000, 32000, 64000, 125000, 250000, 500000, 1000000
]

// Get user's games
export async function getUserGames() {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .select(`
        id,
        started_at,
        ended_at,
        current_level,
        prize_won,
        status
      `)
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, games: data || [] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Create a new game
export async function createGameSession() {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert([
        {
          user_id: user.id,
          started_at: new Date().toISOString(),
          current_level: 1,
          status: 'in_progress',
        },
      ])
      .select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, gameSession: data[0] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get a specific game
export async function getGameSession(gameId) {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .select(`
        id,
        started_at,
        ended_at,
        current_level,
        prize_won
      `)
      .eq('id', gameId)
      .eq('user_id', user.id)
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, gameSession: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get question for current level
export async function getQuestionForLevel(level) {
  try {
    // Get all questions for this level
    const { data: questions, error } = await supabase
      .from('questions')
      .select('id, question_text')
      .eq('difficulty_level_id', level)
      .limit(100)

    if (error) {
      return { success: false, error: error.message }
    }

    if (!questions || questions.length === 0) {
      return { success: false, error: 'No questions available for this level' }
    }

    // Pick a random question
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

    // Get answers for this question
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('id, answer_text, is_correct')
      .eq('question_id', randomQuestion.id)

    if (answersError) {
      return { success: false, error: answersError.message }
    }

    return {
      success: true,
      question: randomQuestion,
      answers: answers || [],
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Submit an answer
export async function submitAnswer(gameSessionId, questionId, answerId, isCorrect) {
  try {
    const { data, error } = await supabase
      .from('game_progress')
      .insert([
        {
          game_session_id: gameSessionId,
          question_id: questionId,
          answer_given: answerId,
          answered_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update game level
export async function updateGameLevel(gameSessionId, newLevel) {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .update({ current_level: newLevel })
      .eq('id', gameSessionId)
      .select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// End game
export async function endGameSession(gameSessionId, finalLevel, prizeWon) {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .update({
        ended_at: new Date().toISOString(),
        current_level: finalLevel,
        prize_won: prizeWon,
        status: 'completed',
      })
      .eq('id', gameSessionId)
      .select()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete game
export async function deleteGameSession(gameSessionId) {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  try {
    const { error } = await supabase
      .from('game_sessions')
      .delete()
      .eq('id', gameSessionId)
      .eq('user_id', user.id)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get difficulty levels
export async function getDifficultyLevels() {
  try {
    const { data, error } = await supabase
      .from('difficulty_levels')
      .select('id, level, prize_amount, difficulty_name')
      .order('level', { ascending: true })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, levels: data || [] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

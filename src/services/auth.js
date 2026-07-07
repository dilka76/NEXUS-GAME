import { supabase } from './supabase-client.js'

export async function register(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      user: data.user,
      message: 'Registration successful! Please check your email to confirm your account.',
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Registration failed',
    }
  }
}

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      session: data.session,
      user: data.user,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed',
    }
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Logout failed',
    }
  }
}

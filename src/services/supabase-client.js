import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) return null
    return data?.user || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) return null
    return data?.session || null
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export function onAuthStateChange(callback) {
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
  return subscription?.unsubscribe
}

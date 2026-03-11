import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Coopr] Supabase not configured — waitlist submissions will be logged to console only')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function submitWaitlistEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.log('[Coopr] Waitlist signup (not stored):', email)
    return { success: true }
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({
      email: email.toLowerCase().trim(),
      source: window.location.hostname,
      referrer: document.referrer || null,
    })

  if (error) {
    // Duplicate email — treat as success (they're already on the list)
    if (error.code === '23505') {
      return { success: true }
    }
    console.error('[Coopr] Waitlist error:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

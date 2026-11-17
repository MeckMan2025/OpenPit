import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when the env isn't set, so the UI can say "not connected" instead of crashing.
export const supabase = url && key ? createClient(url, key) : null
export const FUNCTIONS_URL = url ? `${url}/functions/v1` : null
export const ANON_KEY = key

// Calls the op-mentor edge function (the AI). Throws with a readable message.
export async function callMentor(body) {
  if (!FUNCTIONS_URL) throw new Error('OpenPit is not connected to its backend yet.')
  const res = await fetch(`${FUNCTIONS_URL}/op-mentor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || `The mentor didn't answer (${res.status}).`), { status: res.status })
  return data
}

// 'on' when the AI has its API key, 'off' when it doesn't, 'error' when we can't tell.
// Costs nothing: the function answers this without calling the model.
export async function aiStatus() {
  try {
    await callMentor({ mode: 'status' })
    return 'on'
  } catch (e) {
    return e.status === 503 || !FUNCTIONS_URL ? 'off' : 'error'
  }
}

// Saves one feedback row (see supabase/openpit_phase1.sql). Throws on failure.
export async function sendFeedback(row) {
  if (!supabase) throw new Error('Not connected yet.')
  const { error } = await supabase.from('op_feedback').insert(row)
  if (error) throw error
}

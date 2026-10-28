import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when the env isn't set, so the UI can say "not connected" instead of crashing.
export const supabase = url && key ? createClient(url, key) : null
export const FUNCTIONS_URL = url ? `${url}/functions/v1` : null
export const ANON_KEY = key

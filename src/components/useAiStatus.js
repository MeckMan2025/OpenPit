import { useEffect, useState } from 'react'
import { aiStatus } from '../lib/supabase'

// 'checking' until the edge function answers, then 'on', 'off' or 'error'.
export default function useAiStatus() {
  const [status, setStatus] = useState('checking')
  useEffect(() => {
    let live = true
    aiStatus().then((s) => { if (live) setStatus(s) })
    return () => { live = false }
  }, [])
  return status
}

import { CheckCircle2, AlertTriangle } from 'lucide-react'
export default function Notice({ kind = 'ok', children }) {
  const ok = kind === 'ok'
  return (
    <div className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm ${ok ? 'border-mint-500/40 bg-mint-500/10 text-mint-100' : 'border-spark-500/40 bg-spark-500/10 text-spark-100'}`}>
      {ok ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertTriangle size={16} className="mt-0.5 shrink-0" />}
      <div>{children}</div>
    </div>
  )
}

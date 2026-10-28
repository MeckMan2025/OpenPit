import { Coins, ExternalLink } from 'lucide-react'
import { START_COSTS, TOTAL_START, GOFUNDME_URL } from '../data/costs'
import PageHead from '../components/PageHead'

export default function Fund() {
  return (
    <div>
      <PageHead eyebrow="Fund a Team" title="What it costs, and how we help.">
        Money is the first wall most teams hit. Here is the real number for a first season, and what the OpenPit starter fund does about it.
      </PageHead>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <p className="eyebrow mb-3">A first season, line by line</p>
          <table className="w-full text-sm">
            <tbody>
              {START_COSTS.map((c) => (
                <tr key={c.item} className="border-b border-white/5">
                  <td className="py-2 pr-2">{c.item}<span className="block text-xs text-pit-100/50">{c.note}</span></td>
                  <td className="py-2 text-right font-semibold tabular-nums">${c.usd.toLocaleString()}</td>
                </tr>
              ))}
              <tr><td className="pt-3 font-extrabold">About</td><td className="pt-3 text-right text-lg font-extrabold tabular-nums text-spark-400">${TOTAL_START.toLocaleString()}</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-pit-100/50">US prices, rounded. Most of it is one-time: the second season is roughly half.</p>
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <p className="eyebrow mb-2">The starter fund</p>
            <p className="text-sm text-pit-100/75 leading-relaxed">
              We raise money as a team and pass it on as starter grants: enough for the registration and the control hub, to a team that has
              two adults, a meeting time and a plan, and no budget. Teams that get one tell us how it went, and that story goes back to the donors.
            </p>
            {GOFUNDME_URL
              ? <a href={GOFUNDME_URL} target="_blank" rel="noreferrer" className="btn-primary mt-4"><Coins size={16} /> Give to the starter fund <ExternalLink size={14} /></a>
              : <p className="mt-4 rounded-xl border border-dashed border-white/15 px-3 py-2 text-xs text-pit-100/50">The fundraiser link goes here when the campaign is live.</p>}
          </div>
          <div className="card p-5">
            <p className="eyebrow mb-2">Need help starting?</p>
            <p className="text-sm text-pit-100/75 leading-relaxed">
              Tell us about your team on the Mentors page and pick "Business & Outreach". We'll talk through local sponsors, used parts, and
              whether a starter grant fits.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

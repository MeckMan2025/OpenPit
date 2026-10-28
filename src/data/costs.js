// What it costs to start, so the fundraising goal is a real number, not a vibe.
// Rough US figures; the point is the shape, and that most of it is one-time.
export const START_COSTS = [
  { item: 'FIRST team registration', usd: 295, note: 'per season' },
  { item: 'Control hub + driver hub', usd: 500, note: 'one-time, lasts years' },
  { item: 'Drivetrain kit (chassis, motors, wheels)', usd: 650, note: 'one-time' },
  { item: 'Batteries, charger, wiring, tools', usd: 300, note: 'one-time' },
  { item: 'Game-specific parts and materials', usd: 400, note: 'per season' },
  { item: 'Event fees and travel', usd: 350, note: 'per season, varies a lot' },
]
export const TOTAL_START = START_COSTS.reduce((a, c) => a + c.usd, 0)
export const GOFUNDME_URL = '' // paste the campaign link when it exists

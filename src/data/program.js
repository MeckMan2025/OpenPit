// The program's six-month goals. These are targets, not results: the site
// says so wherever they appear. Add real numbers only once they're verified.
export const GOALS = [
  { value: '5–10', label: 'FTC teams supported' },
  { value: '1–2', label: 'countries reached' },
  { value: '75%', label: 'of teams that finish six months improve their skill score by the target' },
  { value: '+25', label: 'percentage points: the skill-score improvement target' },
]

export const AI_TARGETS = [
  ['70%', 'of problems confirmed resolved'],
  ['80%', 'of answers rated helpful'],
  ['85%', 'accuracy on answers our team reviews'],
  ['60%', 'of suggestions actually tried by the team'],
]

// What a team can ask a person about. Sessions are about 20 minutes.
export const MENTOR_CATEGORIES = [
  { id: 'programming', name: 'Programming', emoji: '💻' },
  { id: 'mechanical', name: 'Mechanical Design', emoji: '🔧' },
  { id: 'cad', name: 'CAD', emoji: '📐' },
  { id: 'autonomous', name: 'Autonomous', emoji: '🧭' },
  { id: 'outreach', name: 'Outreach', emoji: '📣' },
  { id: 'fundraising', name: 'Fundraising', emoji: '💰' },
  { id: 'social', name: 'Social Media', emoji: '📱' },
  { id: 'management', name: 'Team Management', emoji: '🗂️' },
]

// Mentors appear on the site only once they've confirmed. Until then the
// Find a Mentor page is a request form and nobody is listed.
export const MENTORS_CONFIRMED = false

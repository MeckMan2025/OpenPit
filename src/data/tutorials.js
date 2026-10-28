// Video tutorials and written guides. Fill `url` when the video exists; until
// then the card says "coming soon" and still shows what it will cover.
export const TRACKS = [
  { id: 'start', name: 'Starting a team', emoji: '🚀', items: [
    { title: 'What an FTC team actually needs (and what it doesn\'t)', minutes: 8, url: '' },
    { title: 'Registering with FIRST, step by step', minutes: 6, url: '' },
    { title: 'A first-season budget, line by line', minutes: 10, url: '' },
    { title: 'Finding a coach when no one at your school knows robotics', minutes: 7, url: '' },
  ]},
  { id: 'robot', name: 'Robot', emoji: '🤖', items: [
    { title: 'Your first drivetrain: the kit of parts, assembled', minutes: 14, url: '' },
    { title: 'Wiring that passes inspection the first time', minutes: 9, url: '' },
    { title: 'One mechanism done well beats three done badly', minutes: 11, url: '' },
    { title: 'CAD without a CAD class: Onshape for FTC', minutes: 16, url: '' },
  ]},
  { id: 'code', name: 'Code', emoji: '💻', items: [
    { title: 'Android Studio, the SDK, and your first OpMode', minutes: 12, url: '' },
    { title: 'Teleop driving that feels right', minutes: 9, url: '' },
    { title: 'A reliable autonomous with encoders and an IMU', minutes: 15, url: '' },
    { title: 'Reading the telemetry before you touch the code', minutes: 6, url: '' },
  ]},
  { id: 'business', name: 'Business', emoji: '💼', items: [
    { title: 'The sponsor email that gets replies', minutes: 7, url: '' },
    { title: 'An engineering portfolio judges will read', minutes: 13, url: '' },
    { title: 'Outreach that counts, and how to document it', minutes: 8, url: '' },
    { title: 'Running a meeting so people come back', minutes: 6, url: '' },
  ]},
]

// The starter checklist: what a brand-new team does in its first weeks.
export const CHECKLIST = [
  'Find two adults willing to be present (they do not need to know robotics)',
  'Register the team with FIRST and get your team number',
  'Read the game manual once end to end, then the scoring section twice',
  'Order the control hub, a battery, a charger and a drivetrain kit',
  'Pick one scoring task to do well. Just one',
  'Set a weekly meeting time and keep it',
  'Start the engineering portfolio on day one, not the week before the event',
  'Ask a question in OpenPit the first time you are stuck for more than an hour',
]

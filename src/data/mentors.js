// The mentor directory. Add a person here and they appear on the Mentors page
// and in the "send to" list on the question form. Photos go in public/mentors/.
export const AREAS = {
  programming: { name: 'Programming', emoji: '💻', blurb: 'Java, the FTC SDK, autonomous, vision, control loops' },
  technical:   { name: 'Build & CAD', emoji: '🔧', blurb: 'Drivetrains, mechanisms, CAD, wiring, the robot inspection sheet' },
  business:    { name: 'Business & Outreach', emoji: '💼', blurb: 'Sponsors, budgets, the portfolio, judging, outreach, running a team' },
  strategy:    { name: 'Strategy & Scouting', emoji: '🧠', blurb: 'Game analysis, match strategy, scouting, alliance selection' },
}

export const MENTORS = [
  { id: 'kayden',  name: 'Kayden',  team: '7196', role: 'Project Manager · Cofounder of Everything That\'s Scrum', areas: ['programming', 'business'], photo: '/mentors/kayden.jpg',
    bio: 'Built the team\'s management platform and leads the programming side. Ask about getting a first robot moving, structuring a team, or the engineering portfolio.' },
  { id: 'yukti',   name: 'Yukti',   team: '7196', role: 'Project Manager · Cofounder of Everything That\'s Scrum', areas: ['business', 'strategy'], photo: '/mentors/yukti.jpg',
    bio: 'Prototyped the first version of the team app and runs the business side of the season. Ask about judging, outreach plans and keeping a team organized.' },
  { id: 'james',   name: 'James',   team: '7196', role: 'Technical / Hardware Lead', areas: ['technical'], photo: '/mentors/james.jpg',
    bio: 'Build, CAD and hardware. Ask about drivetrains, mechanisms that keep breaking, and what to buy first.' },
  { id: 'pragnya', name: 'Pragnya', team: '7196', role: 'Programming Lead', areas: ['programming'], photo: '/mentors/pragnya.jpg',
    bio: 'Teleop, autonomous and the FTC SDK. Ask about your first OpMode, encoders, or why the robot does the opposite of what you told it.' },
  { id: 'lily',    name: 'Lily',    team: '7196', role: 'Business Lead', areas: ['business'], photo: '/mentors/lily.jpg',
    bio: 'Sponsorships, presentations and outreach. Ask about asking a company for money, or what judges actually want to hear.' },
]

export const mentorById = (id) => MENTORS.find((m) => m.id === id)

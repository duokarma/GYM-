import { fullName, randInt, pick, daysAgo, daysFromNow, initials, fmtDate } from './utils'
import { membershipPlans } from './plans'
import { trainers } from './trainers'

export interface Member {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  avatarColor: string
  plan: string
  planId: string
  status: 'active' | 'expired' | 'frozen' | 'trial'
  joined: string
  renewal: string
  attendanceRate: number
  trainer: string
  age: number
  gender: 'Male' | 'Female'
  balance: number
  goal: string
  weight: number
  height: number
  bodyFat: number
}

const goals = ['Weight loss', 'Muscle gain', 'General fitness', 'Athletic performance', 'Rehabilitation', 'Endurance']
const colors = ['emerald', 'blue', 'amber', 'rose']

export const members: Member[] = Array.from({ length: 64 }).map((_, i) => {
  const name = fullName()
  const plan = pick(membershipPlans)
  const joined = daysAgo(randInt(10, 900))
  const status = pick(['active', 'active', 'active', 'active', 'expired', 'frozen', 'trial'] as const)
  return {
    id: `MEM-${2000 + i}`,
    name,
    initials: initials(name),
    email: `${name.toLowerCase().replace(' ', '.')}@mail.com`,
    phone: `+91 ${randInt(70000, 99999)}${randInt(10000, 99999)}`,
    avatarColor: pick(colors),
    plan: plan.name,
    planId: plan.id,
    status,
    joined: joined.toISOString(),
    renewal: fmtDate(daysFromNow(randInt(-15, 60))),
    attendanceRate: randInt(38, 98),
    trainer: pick(trainers).name,
    age: randInt(18, 56),
    gender: pick(['Male', 'Female'] as const),
    balance: pick([0, 0, 0, 1499, 2999, 4999]),
    goal: pick(goals),
    weight: randInt(52, 95),
    height: randInt(155, 190),
    bodyFat: randInt(10, 32),
  }
})

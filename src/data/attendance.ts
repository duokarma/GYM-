import { randInt, pick, daysAgo, fmtDate } from './utils'
import { members } from './members'

export interface CheckIn {
  id: string
  member: string
  memberId: string
  time: string
  date: string
  method: 'QR Scan' | 'Biometric' | 'Manual'
  status: 'present' | 'late'
}

export const checkIns: CheckIn[] = Array.from({ length: 60 }).map((_, i) => {
  const m = pick(members)
  return {
    id: `CHK-${1200 + i}`,
    member: m.name,
    memberId: m.id,
    time: `${randInt(6, 21)}:${pick(['00', '15', '30', '45'])}`,
    date: fmtDate(daysAgo(randInt(0, 6))),
    method: pick(['QR Scan', 'QR Scan', 'Biometric', 'Manual'] as const),
    status: pick(['present', 'present', 'present', 'present', 'late'] as const),
  }
})

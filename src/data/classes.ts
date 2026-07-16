import { randInt, pick, daysFromNow, fmtDate } from './utils'
import { trainers } from './trainers'

export interface GymClass {
  id: string
  name: string
  instructor: string
  category: string
  capacity: number
  booked: number
  date: string
  time: string
  duration: number
  room: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

const names = ['Power Yoga Flow', 'HIIT Blast', 'Strength Foundations', 'Boxing Fundamentals', 'Spin & Burn', 'Pilates Core', 'CrossFit WOD', 'Mobility & Recovery', 'Zumba Groove', 'Olympic Lifting']
const rooms = ['Studio A', 'Studio B', 'Main Floor', 'Rooftop Deck', 'Boxing Ring']

export const gymClasses: GymClass[] = Array.from({ length: 22 }).map((_, i) => {
  const capacity = randInt(10, 30)
  return {
    id: `CLS-${300 + i}`,
    name: pick(names),
    instructor: pick(trainers).name,
    category: pick(['Yoga', 'HIIT', 'Strength', 'Cardio', 'Combat', 'Recovery']),
    capacity,
    booked: randInt(Math.floor(capacity * 0.3), capacity),
    date: fmtDate(daysFromNow(randInt(-3, 10))),
    time: `${pick(['06:00', '07:30', '09:00', '12:00', '17:30', '18:45', '20:00'])}`,
    duration: pick([30, 45, 60]),
    room: pick(rooms),
    status: pick(['scheduled', 'scheduled', 'scheduled', 'completed', 'cancelled'] as const),
  }
})

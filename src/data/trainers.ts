import { fullName, randInt, pick, daysAgo, initials } from './utils'

export interface Trainer {
  id: string
  name: string
  initials: string
  specialty: string
  certifications: string[]
  rating: number
  assignedMembers: number
  status: 'active' | 'on leave' | 'inactive'
  experience: number
  joined: string
  email: string
  phone: string
}

const specialties = ['Strength & Conditioning', 'Yoga & Mobility', 'HIIT & Functional', 'CrossFit', 'Pilates', 'Powerlifting', 'Boxing & Combat', 'Rehab & Recovery']
const certs = ['ACE-CPT', 'NASM-CPT', 'ISSA', 'RYT-200', 'CrossFit L2', 'Precision Nutrition', 'First Aid/CPR']

export const trainers: Trainer[] = Array.from({ length: 14 }).map((_, i) => {
  const name = fullName()
  return {
    id: `TR-${1000 + i}`,
    name,
    initials: initials(name),
    specialty: pick(specialties),
    certifications: Array.from(new Set(Array.from({ length: randInt(1, 3) }).map(() => pick(certs)))),
    rating: Number((3.8 + randInt(0, 12) / 10).toFixed(1)),
    assignedMembers: randInt(8, 42),
    status: pick(['active', 'active', 'active', 'on leave', 'inactive'] as const),
    experience: randInt(1, 12),
    joined: daysAgo(randInt(60, 1400)).toISOString(),
    email: `${name.toLowerCase().replace(' ', '.')}@ironclad.fit`,
    phone: `+91 ${randInt(70000, 99999)}${randInt(10000, 99999)}`,
  }
})

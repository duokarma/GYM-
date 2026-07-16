import { randInt, pick } from './utils'
import { members } from './members'

export interface WorkoutProgram {
  id: string
  name: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  exercises: number
  assignedMembers: number
  member: string
  status: 'active' | 'template' | 'completed'
}

const names = ['Push Pull Legs Split', '5x5 Strength Builder', 'Hypertrophy Block A', 'Athletic Conditioning', 'Bodyweight Mastery', 'Full Body Reset', 'Powerlifting Peak Cycle', 'Functional Mobility Flow']
const categories = ['Strength', 'Hypertrophy', 'Conditioning', 'Mobility', 'Powerlifting']

export const workoutPrograms: WorkoutProgram[] = Array.from({ length: 26 }).map((_, i) => ({
  id: `WKT-${900 + i}`,
  name: pick(names),
  category: pick(categories),
  difficulty: pick(['Beginner', 'Intermediate', 'Advanced'] as const),
  duration: randInt(4, 12),
  exercises: randInt(6, 18),
  assignedMembers: randInt(1, 22),
  member: pick(members).name,
  status: pick(['active', 'active', 'template', 'completed'] as const),
}))

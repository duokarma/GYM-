import { randInt, pick } from './utils'
import { members } from './members'

export interface NutritionPlan {
  id: string
  name: string
  member: string
  goal: string
  calories: number
  protein: number
  carbs: number
  fats: number
  meals: number
  status: 'active' | 'draft' | 'completed'
}

const planNames = ['Lean Cut Protocol', 'Bulk Season Blueprint', 'Balanced Maintenance', 'Endurance Fuel Plan', 'Keto Reset', 'High Protein Recomp']

export const nutritionPlans: NutritionPlan[] = Array.from({ length: 24 }).map((_, i) => {
  const protein = randInt(120, 220)
  const carbs = randInt(150, 320)
  const fats = randInt(40, 90)
  return {
    id: `NUT-${800 + i}`,
    name: pick(planNames),
    member: pick(members).name,
    goal: pick(['Fat loss', 'Muscle gain', 'Maintenance', 'Performance']),
    calories: protein * 4 + carbs * 4 + fats * 9,
    protein, carbs, fats,
    meals: randInt(3, 6),
    status: pick(['active', 'active', 'draft', 'completed'] as const),
  }
})

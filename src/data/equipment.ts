import { randInt, pick, daysAgo, fmtDate } from './utils'

export interface Equipment {
  id: string
  name: string
  category: string
  purchaseDate: string
  warrantyUntil: string
  condition: 'healthy' | 'maintenance' | 'broken'
  lastServiced: string
  location: string
}

const names = ['Treadmill Pro X3', 'Squat Rack Elite', 'Cable Crossover Station', 'Rowing Machine V2', 'Leg Press 45°', 'Adjustable Bench', 'Smith Machine', 'Assault Bike', 'Dumbbell Set 5-50kg', 'Battle Ropes', 'Kettlebell Rack', 'Lat Pulldown Machine']
const categories = ['Cardio', 'Strength', 'Free Weights', 'Functional']

export const equipment: Equipment[] = Array.from({ length: 34 }).map((_, i) => ({
  id: `EQP-${400 + i}`,
  name: pick(names),
  category: pick(categories),
  purchaseDate: fmtDate(daysAgo(randInt(90, 1200))),
  warrantyUntil: fmtDate(daysAgo(randInt(-400, 200))),
  condition: pick(['healthy', 'healthy', 'healthy', 'maintenance', 'broken'] as const),
  lastServiced: fmtDate(daysAgo(randInt(1, 200))),
  location: pick(['Main Floor', 'Studio A', 'Studio B', 'Cardio Zone', 'Free Weight Area']),
}))

export interface MaintenanceLog {
  id: string
  equipment: string
  issue: string
  reportedOn: string
  status: 'pending' | 'in progress' | 'completed'
  technician: string
  cost: number
}

const issues = ['Belt alignment slipping', 'Unusual motor noise', 'Cushion tear', 'Cable fraying', 'Display malfunction', 'Loose bolts', 'Routine 6-month service']

export const maintenanceLogs: MaintenanceLog[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `MNT-${600 + i}`,
  equipment: pick(equipment).name,
  issue: pick(issues),
  reportedOn: fmtDate(daysAgo(randInt(0, 60))),
  status: pick(['pending', 'in progress', 'completed', 'completed'] as const),
  technician: pick(['Ramesh Fixit Co.', 'Torque Service Team', 'In-house Staff']),
  cost: randInt(500, 15000),
}))

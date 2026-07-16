import { randInt, pick, daysAgo, fmtDate } from './utils'

export interface Expense {
  id: string
  category: 'Rent' | 'Utilities' | 'Equipment' | 'Maintenance' | 'Marketing' | 'Salary' | 'Miscellaneous'
  description: string
  amount: number
  date: string
  status: 'paid' | 'pending'
  vendor: string
}

const descriptions: Record<Expense['category'], string[]> = {
  Rent: ['Monthly facility rent', 'Studio B lease'],
  Utilities: ['Electricity bill', 'Water supply', 'Internet & phone'],
  Equipment: ['New treadmill units', 'Dumbbell set replacement', 'Squat rack purchase'],
  Maintenance: ['HVAC servicing', 'Locker repair', 'Flooring repair'],
  Marketing: ['Instagram ad campaign', 'Local print flyers', 'Referral bonus payouts'],
  Salary: ['Trainer payroll', 'Front desk payroll', 'Management payroll'],
  Miscellaneous: ['Office supplies', 'Cleaning services', 'Software subscriptions'],
}
const vendors = ['Prime Facilities Co.', 'Torque Fitness Supply', 'BrightVolt Utilities', 'AdVantage Media', 'CleanPro Services', 'FlexTech Software']

export const expenses: Expense[] = Array.from({ length: 46 }).map((_, i) => {
  const category = pick(Object.keys(descriptions) as Expense['category'][])
  return {
    id: `EXP-${700 + i}`,
    category,
    description: pick(descriptions[category]),
    amount: randInt(1500, 95000),
    date: fmtDate(daysAgo(randInt(0, 180))),
    status: pick(['paid', 'paid', 'paid', 'pending'] as const),
    vendor: pick(vendors),
  }
})

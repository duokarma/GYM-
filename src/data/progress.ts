export interface ProgressPoint { month: string; weight: number; bodyFat: number; muscle: number }

export const progressHistory: ProgressPoint[] = [
  { month: 'Jan', weight: 82, bodyFat: 24, muscle: 34 },
  { month: 'Feb', weight: 80.5, bodyFat: 23, muscle: 34.5 },
  { month: 'Mar', weight: 79, bodyFat: 21.5, muscle: 35 },
  { month: 'Apr', weight: 78, bodyFat: 20, muscle: 35.8 },
  { month: 'May', weight: 76.8, bodyFat: 18.6, muscle: 36.4 },
  { month: 'Jun', weight: 75.5, bodyFat: 17.2, muscle: 37 },
  { month: 'Jul', weight: 74.6, bodyFat: 16, muscle: 37.6 },
]

export interface StrengthLift { lift: string; oneRM: number; target: number }
export const strengthLifts: StrengthLift[] = [
  { lift: 'Back Squat', oneRM: 120, target: 140 },
  { lift: 'Bench Press', oneRM: 90, target: 105 },
  { lift: 'Deadlift', oneRM: 150, target: 170 },
  { lift: 'Overhead Press', oneRM: 55, target: 65 },
]

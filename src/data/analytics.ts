export const memberGrowth = [
  { month: 'Jan', members: 410 }, { month: 'Feb', members: 442 }, { month: 'Mar', members: 468 },
  { month: 'Apr', members: 501 }, { month: 'May', members: 530 }, { month: 'Jun', members: 566 },
  { month: 'Jul', members: 598 },
]

export const revenueTrend = [
  { month: 'Jan', revenue: 612000, expenses: 380000 }, { month: 'Feb', revenue: 648000, expenses: 392000 },
  { month: 'Mar', revenue: 671000, expenses: 401000 }, { month: 'Apr', revenue: 705000, expenses: 410000 },
  { month: 'May', revenue: 742000, expenses: 418000 }, { month: 'Jun', revenue: 789000, expenses: 430000 },
  { month: 'Jul', revenue: 824000, expenses: 441000 },
]

export const attendanceTrend = [
  { day: 'Mon', checkins: 186 }, { day: 'Tue', checkins: 205 }, { day: 'Wed', checkins: 172 },
  { day: 'Thu', checkins: 214 }, { day: 'Fri', checkins: 238 }, { day: 'Sat', checkins: 264 }, { day: 'Sun', checkins: 141 },
]

export const peakHours = [
  { hour: '6a', visitors: 42 }, { hour: '8a', visitors: 68 }, { hour: '10a', visitors: 35 },
  { hour: '12p', visitors: 58 }, { hour: '2p', visitors: 30 }, { hour: '4p', visitors: 46 },
  { hour: '6p', visitors: 92 }, { hour: '8p', visitors: 74 }, { hour: '10p', visitors: 21 },
]

export const membershipDistribution = [
  { name: 'Starter', value: 86 }, { name: 'Momentum', value: 214 }, { name: 'Elite Performance', value: 132 },
  { name: 'Student Fit', value: 58 }, { name: 'Corporate Wellness', value: 41 }, { name: 'Founders Legacy', value: 12 },
]

export const revenueSources = [
  { name: 'Memberships', value: 68 }, { name: 'Personal Training', value: 14 },
  { name: 'Merchandise', value: 8 }, { name: 'Supplements', value: 6 }, { name: 'Classes', value: 4 },
]

export const expenseBreakdown = [
  { name: 'Salary', value: 44 }, { name: 'Rent', value: 22 }, { name: 'Equipment', value: 12 },
  { name: 'Marketing', value: 9 }, { name: 'Utilities', value: 8 }, { name: 'Misc', value: 5 },
]

export const trainerPerformance = [
  { name: 'Aarav Sharma', members: 34, retention: 92, rating: 4.8 },
  { name: 'Diya Reddy', members: 41, retention: 88, rating: 4.7 },
  { name: 'Vivaan Patel', members: 27, retention: 95, rating: 4.9 },
  { name: 'Ananya Iyer', members: 38, retention: 84, rating: 4.6 },
  { name: 'Kabir Mehta', members: 22, retention: 90, rating: 4.7 },
]

export const equipmentUsage = [
  { name: 'Treadmills', hours: 412 }, { name: 'Squat Racks', hours: 356 }, { name: 'Cable Stations', hours: 298 },
  { name: 'Rowers', hours: 187 }, { name: 'Free Weights', hours: 441 }, { name: 'Bikes', hours: 210 },
]

export const membershipSales = [
  { month: 'Jan', new: 38, renewed: 62 }, { month: 'Feb', new: 42, renewed: 58 }, { month: 'Mar', new: 35, renewed: 71 },
  { month: 'Apr', new: 51, renewed: 66 }, { month: 'May', new: 47, renewed: 74 }, { month: 'Jun', new: 55, renewed: 80 },
  { month: 'Jul', new: 49, renewed: 77 },
]

export const attendanceHeatmap: number[][] = Array.from({ length: 7 }).map(() =>
  Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 100))
)

export interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: string
  billing: 'monthly' | 'quarterly' | 'annual'
  benefits: string[]
  members: number
  status: 'active' | 'draft' | 'inactive'
  popular?: boolean
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'PLN-01', name: 'Starter', price: 1499, duration: '1 Month', billing: 'monthly',
    benefits: ['Gym floor access', 'Locker access', '1 fitness assessment'], members: 86, status: 'active',
  },
  {
    id: 'PLN-02', name: 'Momentum', price: 3999, duration: '3 Months', billing: 'quarterly',
    benefits: ['Gym floor access', '2 group classes / week', 'Locker access', 'Nutrition check-in'], members: 214, status: 'active', popular: true,
  },
  {
    id: 'PLN-03', name: 'Elite Performance', price: 12999, duration: '12 Months', billing: 'annual',
    benefits: ['Unlimited classes', '4 PT sessions / month', 'Priority booking', 'Recovery lounge access', 'Quarterly body composition scan'], members: 132, status: 'active',
  },
  {
    id: 'PLN-04', name: 'Student Fit', price: 999, duration: '1 Month', billing: 'monthly',
    benefits: ['Off-peak gym access', 'Locker access'], members: 58, status: 'active',
  },
  {
    id: 'PLN-05', name: 'Corporate Wellness', price: 8499, duration: '6 Months', billing: 'quarterly',
    benefits: ['Gym floor access', 'Group classes', 'Wellness workshops', 'Team leaderboard'], members: 41, status: 'active',
  },
  {
    id: 'PLN-06', name: 'Founders Legacy', price: 24999, duration: '12 Months', billing: 'annual',
    benefits: ['All-access', 'Dedicated trainer', 'Guest passes x6', 'Nutrition + recovery suite'], members: 12, status: 'draft',
  },
]

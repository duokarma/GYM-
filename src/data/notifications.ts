export interface AppNotification {
  id: string
  title: string
  description: string
  type: 'renewal' | 'birthday' | 'payment' | 'maintenance' | 'system'
  read: boolean
  time: string
}

export const notifications: AppNotification[] = [
  { id: 'N1', title: 'Membership renewal due', description: 'Priya Sharma\u2019s Elite Performance plan expires in 3 days.', type: 'renewal', read: false, time: '10m ago' },
  { id: 'N2', title: 'Birthday today', description: 'Wish Rohan Verma a happy birthday!', type: 'birthday', read: false, time: '1h ago' },
  { id: 'N3', title: 'Payment overdue', description: 'Invoice INV-9021 is 5 days overdue.', type: 'payment', read: false, time: '2h ago' },
  { id: 'N4', title: 'Equipment maintenance alert', description: 'Treadmill Pro X3 flagged for belt alignment.', type: 'maintenance', read: true, time: '5h ago' },
  { id: 'N5', title: 'New trainer onboarded', description: 'Ananya Iyer joined as HIIT & Functional coach.', type: 'system', read: true, time: '1d ago' },
  { id: 'N6', title: 'Low stock alert', description: 'Whey Protein 2kg is running low in inventory.', type: 'system', read: true, time: '1d ago' },
]

export interface Announcement {
  id: string
  title: string
  body: string
  audience: 'All Members' | 'Trainers' | 'Staff'
  date: string
  pinned: boolean
}

export const announcements: Announcement[] = [
  { id: 'A1', title: 'Extended weekend hours starting August', body: 'The gym floor will now stay open until 11 PM on Saturdays and Sundays to accommodate demand.', audience: 'All Members', date: 'Jul 12, 2026', pinned: true },
  { id: 'A2', title: 'New rooftop yoga sessions', body: 'Join our sunrise rooftop yoga sessions every Tuesday and Thursday at 6 AM.', audience: 'All Members', date: 'Jul 08, 2026', pinned: false },
  { id: 'A3', title: 'Trainer certification refresh due', body: 'All trainers must update CPR certification by end of month.', audience: 'Trainers', date: 'Jul 05, 2026', pinned: false },
  { id: 'A4', title: 'Equipment shutdown for deep cleaning', body: 'Studio B will be closed on Jul 20 for deep cleaning and equipment servicing.', audience: 'All Members', date: 'Jul 01, 2026', pinned: false },
]

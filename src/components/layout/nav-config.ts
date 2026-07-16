import {
  LayoutDashboard, Users, CreditCard, CalendarCheck, ScanLine, UserCog, Dumbbell,
  CalendarClock, Receipt, FileText, Wallet, Wrench, ClipboardList, Package,
  Apple, ListChecks, LineChart, Megaphone, LifeBuoy, BarChart3, PieChart,
  Settings, type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Members',
    items: [
      { label: 'Members', to: '/members', icon: Users },
      { label: 'Membership Plans', to: '/membership-plans', icon: CreditCard },
      { label: 'Attendance', to: '/attendance', icon: CalendarCheck },
      { label: 'Check-ins', to: '/check-ins', icon: ScanLine },
    ],
  },
  {
    label: 'Programs',
    items: [
      { label: 'Trainers', to: '/trainers', icon: UserCog },
      { label: 'Classes', to: '/classes', icon: Dumbbell },
      { label: 'Schedules', to: '/schedules', icon: CalendarClock },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payments', to: '/payments', icon: Receipt },
      { label: 'Invoices', to: '/invoices', icon: FileText },
      { label: 'Expenses', to: '/expenses', icon: Wallet },
    ],
  },
  {
    label: 'Facility',
    items: [
      { label: 'Equipment', to: '/equipment', icon: Wrench },
      { label: 'Maintenance', to: '/maintenance', icon: ClipboardList },
      { label: 'Inventory', to: '/inventory', icon: Package },
    ],
  },
  {
    label: 'Coaching',
    items: [
      { label: 'Nutrition Plans', to: '/nutrition-plans', icon: Apple },
      { label: 'Workout Programs', to: '/workout-programs', icon: ListChecks },
      { label: 'Progress Tracking', to: '/progress-tracking', icon: LineChart },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { label: 'Announcements', to: '/announcements', icon: Megaphone },
      { label: 'Support', to: '/support', icon: LifeBuoy },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Reports', to: '/reports', icon: BarChart3 },
      { label: 'Analytics', to: '/analytics', icon: PieChart },
    ],
  },
  {
    label: 'System',
    items: [{ label: 'Settings', to: '/settings', icon: Settings }],
  },
]

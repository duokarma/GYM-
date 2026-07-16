import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from 'sonner'
import { AppLayout } from '@/components/layout/app-layout'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Members = lazy(() => import('@/pages/members'))
const MembershipPlans = lazy(() => import('@/pages/membership-plans'))
const Attendance = lazy(() => import('@/pages/attendance'))
const CheckIns = lazy(() => import('@/pages/check-ins'))
const Trainers = lazy(() => import('@/pages/trainers'))
const Classes = lazy(() => import('@/pages/classes'))
const Schedules = lazy(() => import('@/pages/schedules'))
const Payments = lazy(() => import('@/pages/payments'))
const Invoices = lazy(() => import('@/pages/invoices'))
const Expenses = lazy(() => import('@/pages/expenses'))
const Equipment = lazy(() => import('@/pages/equipment'))
const Maintenance = lazy(() => import('@/pages/maintenance'))
const Inventory = lazy(() => import('@/pages/inventory'))
const NutritionPlans = lazy(() => import('@/pages/nutrition-plans'))
const WorkoutPrograms = lazy(() => import('@/pages/workout-programs'))
const ProgressTracking = lazy(() => import('@/pages/progress-tracking'))
const Announcements = lazy(() => import('@/pages/announcements'))
const Support = lazy(() => import('@/pages/support'))
const Reports = lazy(() => import('@/pages/reports'))
const Analytics = lazy(() => import('@/pages/analytics'))
const Settings = lazy(() => import('@/pages/settings'))
const NotFound = lazy(() => import('@/pages/not-found'))

function PageFallback() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-edge-hover)] border-t-[var(--color-success)]" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/membership-plans" element={<MembershipPlans />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/check-ins" element={<CheckIns />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/nutrition-plans" element={<NutritionPlans />} />
            <Route path="/workout-programs" element={<WorkoutPrograms />} />
            <Route path="/progress-tracking" element={<ProgressTracking />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/support" element={<Support />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

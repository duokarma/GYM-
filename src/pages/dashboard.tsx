import { Users, UserCheck, ScanLine, IndianRupee, Clock, UserCog, HeartPulse, CalendarClock, UserPlus, Wallet, FileText, CalendarPlus, Receipt as ReceiptIcon, PlusCircle } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { StatCard } from '@/components/shared/stat-card'
import { ChartCard } from '@/components/shared/chart-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { members } from '@/data/members'
import { trainers } from '@/data/trainers'
import { equipment } from '@/data/equipment'
import { gymClasses } from '@/data/classes'
import { memberGrowth, revenueTrend, attendanceTrend, peakHours, membershipDistribution, revenueSources } from '@/data/analytics'
import { notifications, announcements } from '@/data/notifications'
import { formatCurrency, formatNumber, initials } from '@/lib/utils'

const activeMembers = members.filter((m) => m.status === 'active').length
const todayCheckins = 214
const monthlyRevenue = revenueTrend[revenueTrend.length - 1].revenue
const pendingPayments = 18
const healthyEquipment = Math.round((equipment.filter((e) => e.condition === 'healthy').length / equipment.length) * 100)
const upcomingClasses = gymClasses.filter((c) => c.status === 'scheduled').length

const PIE_COLORS = ['var(--color-success)', 'var(--color-accent)', 'var(--color-warning)', 'var(--color-danger)', '#8B9A7A', '#6B7A99']

const spark = (base: number) => Array.from({ length: 10 }).map((_, i) => ({ v: base + Math.sin(i) * base * 0.15 + i * base * 0.02 }))

const quickActions = [
  { label: 'Add Member', icon: UserPlus },
  { label: 'Record Payment', icon: Wallet },
  { label: 'Create Workout Plan', icon: PlusCircle },
  { label: 'Schedule Class', icon: CalendarPlus },
  { label: 'Issue Invoice', icon: ReceiptIcon },
  { label: 'Add Trainer', icon: UserCog },
]

const renewals = members
  .filter((m) => m.status === 'active')
  .slice(0, 5)
  .map((m) => ({ name: m.name, plan: m.plan, date: m.renewal }))

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Studio overview for Ironclad Fitness — Thursday, July 15, 2026"
        actions={<Button variant="primary" size="sm"><UserPlus className="h-4 w-4" /> Add Member</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Members" value={formatNumber(members.length + 540)} delta={8.2} icon={Users} accent="emerald" spark={spark(560)} />
        <StatCard label="Active Members" value={formatNumber(activeMembers + 480)} delta={5.4} icon={UserCheck} accent="blue" spark={spark(500)} />
        <StatCard label="Today's Check-ins" value={formatNumber(todayCheckins)} delta={12.1} icon={ScanLine} accent="emerald" spark={spark(200)} />
        <StatCard label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} delta={6.7} icon={IndianRupee} accent="amber" spark={spark(700)} />
        <StatCard label="Pending Payments" value={formatNumber(pendingPayments)} delta={-3.2} icon={Clock} accent="rose" spark={spark(20)} />
        <StatCard label="Trainer Count" value={formatNumber(trainers.length)} delta={0} deltaLabel="no change" icon={UserCog} accent="blue" />
        <StatCard label="Equipment Health" value={`${healthyEquipment}%`} delta={2.1} icon={HeartPulse} accent="emerald" />
        <StatCard label="Upcoming Classes" value={formatNumber(upcomingClasses)} delta={9.8} icon={CalendarClock} accent="amber" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Member Growth" description="New total members over time" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={memberGrowth}>
              <defs>
                <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Area type="monotone" dataKey="members" stroke="var(--color-success)" strokeWidth={2} fill="url(#growth)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Membership Distribution" description="Active members per plan">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={membershipDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {membershipDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {membershipDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-[var(--color-ink-dim)]">
                <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Revenue Trend" description="Revenue vs expenses">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} formatter={(v: any) => formatCurrency(Number(v))} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="var(--color-danger)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attendance Trend" description="Check-ins this week">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="checkins" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Hours" description="Visitor volume by hour">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="visitors" fill="var(--color-warning)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-1">
          <h3 className="mb-4 font-playfair text-base font-medium">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="flex flex-col items-start gap-2 rounded-xl border border-[var(--color-edge)] p-3 text-left text-xs font-medium text-[var(--color-ink-dim)] transition-colors hover:border-[var(--color-success)]/40 hover:bg-[var(--color-success-subtle)] hover:text-[var(--color-success)]"
              >
                <a.icon className="h-4 w-4" strokeWidth={1.75} />
                {a.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-playfair text-base font-medium">Recent Activity</h3>
            <Badge variant="neutral">{notifications.length} events</Badge>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-success)]" />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{n.title}</p>
                  <p className="truncate text-xs text-[var(--color-ink-faint)]">{n.description}</p>
                </div>
                <span className="ml-auto shrink-0 text-[11px] text-[var(--color-ink-faint)]">{n.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-playfair text-base font-medium">Upcoming Renewals</h3>
          <div className="space-y-3">
            {renewals.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <Avatar className="h-8 w-8"><AvatarFallback>{initials(r.name)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{r.plan}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-[var(--color-warning)]">{r.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Revenue Sources" className="xl:col-span-1">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={revenueSources} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                {revenueSources.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="p-5">
          <h3 className="mb-3 font-playfair text-base font-medium">Maintenance Alerts</h3>
          <div className="space-y-3">
            {equipment.filter((e) => e.condition !== 'healthy').slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{e.location}</p>
                </div>
                <Badge variant={e.condition === 'broken' ? 'danger' : 'warning'} dot>{e.condition}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-playfair text-base font-medium">Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((a) => (
              <div key={a.id}>
                <div className="flex items-center gap-2">
                  {a.pinned && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />}
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                </div>
                <p className="mt-0.5 text-xs text-[var(--color-ink-faint)]">{a.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

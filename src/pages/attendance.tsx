import { PageHeader } from '@/components/shared/page-header'
import { ChartCard } from '@/components/shared/chart-card'
import { StatCard } from '@/components/shared/stat-card'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarCheck, Clock, TrendingUp, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { attendanceTrend, peakHours, attendanceHeatmap } from '@/data/analytics'
import { checkIns } from '@/data/attendance'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = ['6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p', '11p', '12a', '1a']

function heatColor(v: number) {
  if (v > 75) return 'bg-[var(--color-success)]'
  if (v > 50) return 'bg-[var(--color-success)]/60'
  if (v > 25) return 'bg-[var(--color-success)]/30'
  return 'bg-[var(--color-charcoal-soft)]'
}

const lateArrivals = checkIns.filter((c) => c.status === 'late').slice(0, 8)

export default function Attendance() {
  const totalWeekly = attendanceTrend.reduce((s, d) => s + d.checkins, 0)
  return (
    <div>
      <PageHeader title="Attendance" description="Daily and weekly attendance patterns across the facility" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Weekly Check-ins" value={totalWeekly.toLocaleString()} icon={CalendarCheck} accent="emerald" delta={6.4} />
        <StatCard label="Avg. Daily Visitors" value={Math.round(totalWeekly / 7).toString()} icon={Users} accent="blue" delta={3.1} />
        <StatCard label="Peak Hour" value="6:00 PM" icon={Clock} accent="amber" />
        <StatCard label="Late Arrivals" value={lateArrivals.length.toString()} icon={TrendingUp} accent="rose" delta={-4.5} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Weekly Attendance" description="Check-ins by day">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="checkins" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Hours" description="Visitor volume across the day">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="visitors" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h3 className="mb-4 font-playfair text-base font-medium">Monthly Attendance Heatmap</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="mb-1 grid grid-cols-[40px_repeat(12,1fr)] gap-1 text-[10px] text-[var(--color-ink-faint)]">
                <div />
                {hours.map((h) => <div key={h} className="text-center">{h}</div>)}
              </div>
              {attendanceHeatmap.map((row, i) => (
                <div key={i} className="mb-1 grid grid-cols-[40px_repeat(12,1fr)] gap-1">
                  <div className="text-[11px] text-[var(--color-ink-faint)]">{days[i]}</div>
                  {row.map((v, j) => (
                    <div key={j} className={`h-5 rounded ${heatColor(v)}`} title={`${v} visitors`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-playfair text-base font-medium">Late Arrivals</h3>
          <div className="space-y-3">
            {lateArrivals.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{c.member}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{c.date} &middot; {c.time}</p>
                </div>
                <Badge variant="warning">late</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

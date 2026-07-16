import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { ChartCard } from '@/components/shared/chart-card'
import { Card } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { revenueTrend, peakHours, trainerPerformance } from '@/data/analytics'
import { TrendingUp, Users, Award, Activity } from 'lucide-react'

const insights = [
  { icon: TrendingUp, label: 'Revenue up 6.7% MoM', detail: 'Driven by Elite Performance plan upgrades', bg: 'bg-[var(--color-success-subtle)]', fg: 'text-[var(--color-success)]' },
  { icon: Users, label: 'Retention holding at 89%', detail: 'Highest among 3-month+ members', bg: 'bg-[var(--color-accent-subtle)]', fg: 'text-[var(--color-accent)]' },
  { icon: Award, label: 'Vivaan Patel: top-rated trainer', detail: '4.9 rating with 95% member retention', bg: 'bg-[var(--color-warning-subtle)]', fg: 'text-[var(--color-warning)]' },
  { icon: Activity, label: 'Saturday is peak attendance day', detail: '264 average check-ins', bg: 'bg-[var(--color-danger-subtle)]', fg: 'text-[var(--color-danger)]' },
]

export default function Analytics() {
  const [range, setRange] = useState('30d')

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Deep insights across revenue, retention and performance"
        actions={
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((ins) => (
          <Card key={ins.label} className="p-4">
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${ins.bg}`}>
              <ins.icon className={`h-4 w-4 ${ins.fg}`} />
            </div>
            <p className="text-sm font-medium leading-tight">{ins.label}</p>
            <p className="mt-1 text-xs text-[var(--color-ink-faint)]">{ins.detail}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Interactive revenue analysis">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="an-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-success)" strokeWidth={2} fill="url(#an-rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Hours Heatmap" description="Visitor density by hour">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="visitors" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Trainer Performance" description="Retention rate by trainer" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={trainerPerformance}>
              <PolarGrid stroke="var(--color-edge)" />
              <PolarAngleAxis dataKey="name" fontSize={11} stroke="var(--color-ink-faint)" />
              <PolarRadiusAxis fontSize={10} stroke="var(--color-ink-faint)" />
              <Radar dataKey="retention" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.25} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4">
        <Card className="p-5">
          <h3 className="mb-3 font-playfair text-base font-medium">Trainer Leaderboard</h3>
          <div className="space-y-2">
            {trainerPerformance.map((t, i) => (
              <div key={t.name} className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-charcoal-soft)] text-xs font-medium">{i + 1}</span>
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--color-ink-faint)]">
                  <span>{t.members} members</span>
                  <Badge variant="success">{t.retention}% retention</Badge>
                  <Badge variant="outline">★ {t.rating}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

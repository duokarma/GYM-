import { PageHeader } from '@/components/shared/page-header'
import { ChartCard } from '@/components/shared/chart-card'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { progressHistory, strengthLifts } from '@/data/progress'

export default function ProgressTracking() {
  const latest = progressHistory[progressHistory.length - 1]
  const first = progressHistory[0]

  return (
    <div>
      <PageHeader title="Progress Tracking" description="Body composition and strength trends" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">Weight</p>
          <p className="mt-1 font-playfair text-2xl">{latest.weight}kg <span className="text-sm text-[var(--color-success)]">({(latest.weight - first.weight).toFixed(1)}kg)</span></p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">Body Fat</p>
          <p className="mt-1 font-playfair text-2xl">{latest.bodyFat}% <span className="text-sm text-[var(--color-success)]">({(latest.bodyFat - first.bodyFat).toFixed(1)}%)</span></p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">Muscle Mass</p>
          <p className="mt-1 font-playfair text-2xl">{latest.muscle}kg <span className="text-sm text-[var(--color-success)]">(+{(latest.muscle - first.muscle).toFixed(1)}kg)</span></p>
        </Card>
      </div>

      <div className="mt-4">
        <ChartCard title="Body Composition Timeline" description="Weight, body fat % and muscle mass over 7 months">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={progressHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="var(--color-accent)" strokeWidth={2} />
              <Line type="monotone" dataKey="bodyFat" name="Body Fat (%)" stroke="var(--color-danger)" strokeWidth={2} />
              <Line type="monotone" dataKey="muscle" name="Muscle (kg)" stroke="var(--color-success)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="mt-4 p-5">
        <h3 className="mb-4 font-playfair text-base font-medium">Strength Tracking</h3>
        <div className="space-y-4">
          {strengthLifts.map((l) => (
            <div key={l.lift}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{l.lift}</span>
                <span className="text-[var(--color-ink-faint)]">{l.oneRM}kg / {l.target}kg target</span>
              </div>
              <Progress value={(l.oneRM / l.target) * 100} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

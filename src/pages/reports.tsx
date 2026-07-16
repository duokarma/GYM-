import { Download, FileBarChart } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { ChartCard } from '@/components/shared/chart-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { revenueTrend, memberGrowth, membershipSales, equipmentUsage } from '@/data/analytics'
import { expenses } from '@/data/expenses'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const reportTypes = [
  'Revenue Report', 'Attendance Report', 'Member Growth Report', 'Trainer Performance Report',
  'Equipment Usage Report', 'Expense Report', 'Membership Sales Report',
]

export default function Reports() {
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and export operational reports"
        actions={<Button variant="outline" size="sm" onClick={() => toast.success('Exporting all reports')}><Download className="h-4 w-4" /> Export All</Button>}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {reportTypes.map((r) => (
          <Card key={r} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2.5">
              <FileBarChart className="h-4 w-4 text-[var(--color-ink-faint)]" />
              <span className="text-sm font-medium">{r}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toast.success(`${r} exported`)}><Download className="h-3.5 w-3.5" /></Button>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue vs Expenses" description={`Total expenses this period: ${formatCurrency(totalExpense)}`}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} formatter={(v: any) => formatCurrency(Number(v))} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="var(--color-danger)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Member Growth" description="Cumulative membership growth">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={memberGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="members" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Membership Sales" description="New vs renewed memberships">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={membershipSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="new" stackId="a" fill="var(--color-success)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="renewed" stackId="a" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Equipment Usage" description="Hours utilized by category">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={equipmentUsage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={12} width={100} stroke="var(--color-ink-faint)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Bar dataKey="hours" fill="var(--color-warning)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

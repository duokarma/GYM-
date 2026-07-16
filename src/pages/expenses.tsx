import type { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { ChartCard } from '@/components/shared/chart-card'
import { StatCard } from '@/components/shared/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { expenses, type Expense } from '@/data/expenses'
import { expenseBreakdown } from '@/data/analytics'
import { formatCurrency } from '@/lib/utils'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['var(--color-success)', 'var(--color-accent)', 'var(--color-warning)', 'var(--color-danger)', '#8B9A7A', '#6B7A99']

const columns: ColumnDef<Expense>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge> },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'vendor', header: 'Vendor' },
  { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => formatCurrency(row.original.amount) },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <Badge variant={row.original.status === 'paid' ? 'success' : 'warning'} dot>{row.original.status}</Badge> },
]

export default function Expenses() {
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const pending = expenses.filter((e) => e.status === 'pending').reduce((s, e) => s + e.amount, 0)

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Operating cost breakdown across categories"
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add Expense</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Expenses" value={formatCurrency(total)} icon={Wallet} accent="rose" delta={4.1} />
        <StatCard label="Pending Payouts" value={formatCurrency(pending)} icon={Wallet} accent="amber" delta={-2.3} />
        <StatCard label="Line Items" value={expenses.length.toString()} icon={Wallet} accent="blue" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard title="Expense Breakdown" className="xl:col-span-1">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {expenseBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="xl:col-span-2">
          <DataTable columns={columns} data={expenses} searchKey="description" searchPlaceholder="Search expenses..." pageSize={8} />
        </div>
      </div>
    </div>
  )
}

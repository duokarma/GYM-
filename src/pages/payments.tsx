import type { ColumnDef } from '@tanstack/react-table'
import { Download, IndianRupee } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { StatCard } from '@/components/shared/stat-card'
import { ChartCard } from '@/components/shared/chart-card'
import { Button } from '@/components/ui/button'
import { payments, type Payment } from '@/data/payments'
import { revenueTrend } from '@/data/analytics'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'

const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'id', header: 'Payment ID' },
  { accessorKey: 'member', header: 'Member' },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => formatCurrency(row.original.amount) },
  { accessorKey: 'method', header: 'Method' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
]

export default function Payments() {
  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const totalOverdue = payments.filter((p) => p.status === 'overdue').reduce((s, p) => s + p.amount, 0)

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Transaction history and collection overview"
        actions={<Button variant="outline" size="sm" onClick={() => toast.success('Export started')}><Download className="h-4 w-4" /> Export</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Collected" value={formatCurrency(totalPaid)} icon={IndianRupee} accent="emerald" delta={7.2} />
        <StatCard label="Pending" value={formatCurrency(totalPending)} icon={IndianRupee} accent="amber" delta={-1.4} />
        <StatCard label="Overdue" value={formatCurrency(totalOverdue)} icon={IndianRupee} accent="rose" delta={2.8} />
      </div>

      <div className="mt-4">
        <ChartCard title="Revenue Trend" description="Monthly collections">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="pay-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-edge)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-ink-faint)" />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-edge)', fontSize: 12 }} formatter={(v: any) => formatCurrency(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-success)" strokeWidth={2} fill="url(#pay-rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={payments} searchKey="member" searchPlaceholder="Search by member name..." pageSize={10} />
      </div>
    </div>
  )
}

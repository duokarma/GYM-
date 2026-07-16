import type { ColumnDef } from '@tanstack/react-table'
import { Plus, ClipboardList } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatCard } from '@/components/shared/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { maintenanceLogs, type MaintenanceLog } from '@/data/equipment'
import { formatCurrency } from '@/lib/utils'

const columns: ColumnDef<MaintenanceLog>[] = [
  { accessorKey: 'id', header: 'Log ID' },
  { accessorKey: 'equipment', header: 'Equipment' },
  { accessorKey: 'issue', header: 'Issue' },
  { accessorKey: 'technician', header: 'Technician' },
  { accessorKey: 'reportedOn', header: 'Reported' },
  { accessorKey: 'cost', header: 'Cost', cell: ({ row }) => formatCurrency(row.original.cost) },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const s = row.original.status
      return <Badge variant={s === 'completed' ? 'success' : s === 'in progress' ? 'info' : 'warning'} dot>{s}</Badge>
    },
  },
]

export default function Maintenance() {
  const pending = maintenanceLogs.filter((l) => l.status !== 'completed').length
  const totalCost = maintenanceLogs.reduce((s, l) => s + l.cost, 0)

  return (
    <div>
      <PageHeader
        title="Maintenance"
        description="Repair schedule and equipment service logs"
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Log Issue</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Open Tickets" value={pending.toString()} icon={ClipboardList} accent="amber" />
        <StatCard label="Completed This Month" value={maintenanceLogs.filter((l) => l.status === 'completed').length.toString()} icon={ClipboardList} accent="emerald" />
        <StatCard label="Total Maintenance Spend" value={formatCurrency(totalCost)} icon={ClipboardList} accent="rose" />
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={maintenanceLogs} searchKey="equipment" searchPlaceholder="Search by equipment..." pageSize={10} />
      </div>
    </div>
  )
}

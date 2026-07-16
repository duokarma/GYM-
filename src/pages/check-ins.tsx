import type { ColumnDef } from '@tanstack/react-table'
import { QrCode, ScanLine } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { checkIns, type CheckIn } from '@/data/attendance'
import { toast } from 'sonner'

const columns: ColumnDef<CheckIn>[] = [
  { accessorKey: 'member', header: 'Member' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'method', header: 'Method' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
]

export default function CheckIns() {
  return (
    <div>
      <PageHeader title="Check-ins" description="Live check-in kiosk and recent scan history" />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center xl:col-span-1">
          <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-edge-hover)] bg-[var(--color-charcoal-soft)]">
            <QrCode className="h-16 w-16 text-[var(--color-ink-faint)]" strokeWidth={1} />
          </div>
          <div>
            <p className="font-playfair text-base font-medium">Scan to check in</p>
            <p className="mt-1 text-xs text-[var(--color-ink-faint)]">Point your membership QR code at the scanner</p>
          </div>
          <Button variant="primary" onClick={() => toast.success('Check-in recorded')}>
            <ScanLine className="h-4 w-4" /> Simulate Scan
          </Button>
        </Card>

        <div className="xl:col-span-2">
          <DataTable columns={columns} data={checkIns} searchKey="member" searchPlaceholder="Search by member name..." pageSize={8} />
        </div>
      </div>
    </div>
  )
}

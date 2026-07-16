import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Download, FileText, Eye } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { invoices, type Invoice } from '@/data/payments'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

export default function Invoices() {
  const [selected, setSelected] = useState<Invoice | null>(null)

  const columns: ColumnDef<Invoice>[] = [
    { accessorKey: 'id', header: 'Invoice ID' },
    { accessorKey: 'member', header: 'Member' },
    { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => formatCurrency(row.original.amount) },
    { accessorKey: 'tax', header: 'Tax (GST)', cell: ({ row }) => formatCurrency(row.original.tax) },
    { accessorKey: 'issued', header: 'Issued' },
    { accessorKey: 'due', header: 'Due' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(row.original) }}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Invoices"
        description={`${invoices.length} invoices issued`}
        actions={<Button variant="outline" size="sm" onClick={() => toast.success('Export started')}><Download className="h-4 w-4" /> Export</Button>}
      />

      <DataTable columns={columns} data={invoices} searchKey="member" searchPlaceholder="Search by member name..." pageSize={10} onRowClick={setSelected} />

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--color-success)]" />
                  <DialogTitle>{selected.id}</DialogTitle>
                </div>
                <DialogDescription>Issued to {selected.member}</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 rounded-xl border border-[var(--color-edge)] p-4 text-sm">
                <div className="flex justify-between"><span className="text-[var(--color-ink-faint)]">Subtotal</span><span>{formatCurrency(selected.amount)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-ink-faint)]">GST (18%)</span><span>{formatCurrency(selected.tax)}</span></div>
                <div className="flex justify-between border-t border-[var(--color-edge)] pt-2 font-medium"><span>Total</span><span>{formatCurrency(selected.amount + selected.tax)}</span></div>
                <div className="flex justify-between pt-2"><span className="text-[var(--color-ink-faint)]">Status</span><StatusBadge status={selected.status} /></div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { Plus, Wrench } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/status-badge'
import { equipment } from '@/data/equipment'

export default function Equipment() {
  return (
    <div>
      <PageHeader
        title="Equipment"
        description={`${equipment.length} assets tracked across the facility`}
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add Equipment</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {equipment.map((e) => (
          <Card key={e.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-charcoal-soft)]">
                  <Wrench className="h-4.5 w-4.5 text-[var(--color-ink-dim)]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-playfair text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{e.category} &middot; {e.location}</p>
                </div>
              </div>
              <StatusBadge status={e.condition} />
            </div>
            <div className="mt-4 space-y-1 border-t border-[var(--color-edge)] pt-3 text-xs text-[var(--color-ink-faint)]">
              <div className="flex justify-between"><span>Purchased</span><span className="text-[var(--color-ink-dim)]">{e.purchaseDate}</span></div>
              <div className="flex justify-between"><span>Warranty until</span><span className="text-[var(--color-ink-dim)]">{e.warrantyUntil}</span></div>
              <div className="flex justify-between"><span>Last serviced</span><span className="text-[var(--color-ink-dim)]">{e.lastServiced}</span></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Plus, Package } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { inventory } from '@/data/inventory'
import { formatCurrency } from '@/lib/utils'

const categories = ['Supplements', 'Merchandise', 'Consumables'] as const

export default function Inventory() {
  return (
    <div>
      <PageHeader
        title="Inventory"
        description={`${inventory.length} SKUs across supplements, merchandise & consumables`}
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add Item</Button>}
      />

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="mb-3 font-playfair text-base font-medium">{cat}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {inventory.filter((i) => i.category === cat).map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-charcoal-soft)]">
                      <Package className="h-4 w-4 text-[var(--color-ink-dim)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-[var(--color-ink-faint)]">{item.supplier}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'in_stock' ? 'success' : item.status === 'low_stock' ? 'warning' : 'danger'} dot>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-[var(--color-ink-faint)]">
                    <span>Stock: {item.stock} units</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                  <Progress value={Math.min(100, (item.stock / 120) * 100)} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

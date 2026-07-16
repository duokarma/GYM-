import { Plus, Apple, Flame } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/status-badge'
import { nutritionPlans } from '@/data/nutrition'

export default function NutritionPlans() {
  return (
    <div>
      <PageHeader
        title="Nutrition Plans"
        description={`${nutritionPlans.length} meal plans assigned to members`}
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Create Plan</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {nutritionPlans.map((n) => (
          <Card key={n.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-success-subtle)]">
                  <Apple className="h-4 w-4 text-[var(--color-success)]" />
                </div>
                <div>
                  <p className="text-sm font-medium">{n.name}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{n.member}</p>
                </div>
              </div>
              <StatusBadge status={n.status} />
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium">
              <Flame className="h-4 w-4 text-[var(--color-warning)]" /> {n.calories.toLocaleString()} kcal/day
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-[var(--color-charcoal-soft)] p-2">
                <p className="font-medium text-[var(--color-ink)]">{n.protein}g</p>
                <p className="text-[var(--color-ink-faint)]">Protein</p>
              </div>
              <div className="rounded-lg bg-[var(--color-charcoal-soft)] p-2">
                <p className="font-medium text-[var(--color-ink)]">{n.carbs}g</p>
                <p className="text-[var(--color-ink-faint)]">Carbs</p>
              </div>
              <div className="rounded-lg bg-[var(--color-charcoal-soft)] p-2">
                <p className="font-medium text-[var(--color-ink)]">{n.fats}g</p>
                <p className="text-[var(--color-ink-faint)]">Fats</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-[var(--color-ink-faint)]">Goal: {n.goal} &middot; {n.meals} meals/day</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

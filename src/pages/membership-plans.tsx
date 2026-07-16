import { useState } from 'react'
import { Check, Plus, MoreVertical, Star } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { membershipPlans as initialPlans, type MembershipPlan } from '@/data/plans'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { toast } from 'sonner'

export default function MembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans)
  const [deleteTarget, setDeleteTarget] = useState<MembershipPlan | null>(null)
  const [editTarget, setEditTarget] = useState<MembershipPlan | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  function handleDelete() {
    if (!deleteTarget) return
    setPlans((p) => p.filter((pl) => pl.id !== deleteTarget.id))
    toast.success(`${deleteTarget.name} plan deleted`)
    setDeleteTarget(null)
  }

  return (
    <div>
      <PageHeader
        title="Membership Plans"
        description={`${plans.length} plans &middot; ${formatNumber(plans.reduce((s, p) => s + p.members, 0))} members enrolled`}
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Create Plan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create membership plan</DialogTitle>
                <DialogDescription>Define pricing and benefits for a new plan.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="plan-name">Plan name</Label>
                  <Input id="plan-name" placeholder="e.g. Peak Performance" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="plan-price">Price (INR)</Label>
                    <Input id="plan-price" type="number" placeholder="4999" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="plan-duration">Duration</Label>
                    <Input id="plan-duration" placeholder="3 Months" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="plan-benefits">Benefits (one per line)</Label>
                  <textarea
                    id="plan-benefits"
                    rows={4}
                    className="w-full rounded-lg border border-[var(--color-edge-hover)] surface-card p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-success)]/40"
                    placeholder={'Gym floor access\n2 classes / week'}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setCreateOpen(false)
                    toast.success('Plan created')
                  }}
                >
                  Create Plan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative flex flex-col p-6 ${plan.popular ? 'border-[var(--color-success)] ring-1 ring-[var(--color-success)]/30' : ''}`}>
            {plan.popular && (
              <Badge variant="success" className="absolute right-5 top-5"><Star className="h-3 w-3" /> Popular</Badge>
            )}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-playfair text-lg font-medium">{plan.name}</p>
                <p className="text-xs text-[var(--color-ink-faint)]">{plan.duration}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg p-1.5 text-[var(--color-ink-faint)] hover:bg-[var(--color-charcoal-soft)]">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditTarget(plan)}>Edit plan</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-[var(--color-danger)]" onClick={() => setDeleteTarget(plan)}>Delete plan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4">
              <span className="font-playfair text-3xl font-medium">{formatCurrency(plan.price)}</span>
              <span className="text-sm text-[var(--color-ink-faint)]"> /{plan.billing}</span>
            </div>

            <ul className="mt-4 flex-1 space-y-2">
              {plan.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[var(--color-ink-dim)]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-success)]" /> {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--color-edge)] pt-4">
              <span className="text-xs text-[var(--color-ink-faint)]">{plan.members} members enrolled</span>
              <Badge variant={plan.status === 'active' ? 'success' : plan.status === 'draft' ? 'neutral' : 'danger'}>{plan.status}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editTarget?.name}</DialogTitle>
            <DialogDescription>Update pricing and benefits for this plan.</DialogDescription>
          </DialogHeader>
          {editTarget && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label>Plan name</Label>
                <Input defaultValue={editTarget.name} />
              </div>
              <div className="space-y-1.5">
                <Label>Price (INR)</Label>
                <Input type="number" defaultValue={editTarget.price} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
            <Button variant="primary" onClick={() => { toast.success('Plan updated'); setEditTarget(null) }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.name}?</DialogTitle>
            <DialogDescription>This will remove the plan permanently. Members on this plan will keep access until expiry.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LifeBuoy, Plus } from 'lucide-react'
import { members } from '@/data/members'
import { pick, randInt } from '@/data/utils'
import { initials } from '@/lib/utils'

const subjects = [
  'Unable to book class slot', 'Billing discrepancy on last invoice', 'Locker key replacement request',
  'Trainer reassignment request', 'App login issue', 'Membership freeze request', 'Feedback on new equipment',
]

const tickets = Array.from({ length: 10 }).map((_, i) => ({
  id: `TCK-${100 + i}`,
  member: pick(members).name,
  subject: pick(subjects),
  priority: pick(['Low', 'Medium', 'High'] as const),
  status: pick(['open', 'pending', 'completed'] as const),
  updated: `${randInt(1, 12)}h ago`,
}))

export default function Support() {
  return (
    <div>
      <PageHeader
        title="Support"
        description="Member support tickets and requests"
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> New Ticket</Button>}
      />

      <div className="space-y-3">
        {tickets.map((t) => (
          <Card key={t.id} className="flex items-center gap-4 p-4">
            <Avatar className="h-9 w-9"><AvatarFallback>{initials(t.member)}</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{t.subject}</p>
              <p className="text-xs text-[var(--color-ink-faint)]">{t.member} &middot; {t.id} &middot; updated {t.updated}</p>
            </div>
            <Badge variant={t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'neutral'}>{t.priority}</Badge>
            <Badge variant={t.status === 'completed' ? 'success' : t.status === 'pending' ? 'warning' : 'info'} dot>{t.status}</Badge>
            <LifeBuoy className="h-4 w-4 shrink-0 text-[var(--color-ink-faint)]" />
          </Card>
        ))}
      </div>
    </div>
  )
}

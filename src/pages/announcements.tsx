import { Plus, Megaphone, Pin } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { announcements } from '@/data/notifications'

export default function Announcements() {
  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Broadcast updates to members, trainers, or staff"
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> New Announcement</Button>}
      />

      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-warning-subtle)]">
                  <Megaphone className="h-4 w-4 text-[var(--color-warning)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {a.pinned && <Pin className="h-3.5 w-3.5 text-[var(--color-success)]" />}
                    <p className="font-playfair text-base font-medium">{a.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-ink-dim)]">{a.body}</p>
                  <p className="mt-2 text-xs text-[var(--color-ink-faint)]">{a.date}</p>
                </div>
              </div>
              <Badge variant="outline">{a.audience}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

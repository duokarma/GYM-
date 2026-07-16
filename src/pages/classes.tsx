import { CalendarPlus, MapPin, Clock, Users } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/shared/status-badge'
import { gymClasses } from '@/data/classes'

export default function Classes() {
  return (
    <div>
      <PageHeader
        title="Classes"
        description={`${gymClasses.filter((c) => c.status === 'scheduled').length} upcoming sessions this week`}
        actions={<Button variant="primary" size="sm"><CalendarPlus className="h-4 w-4" /> Schedule Class</Button>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {gymClasses.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-playfair text-base font-medium">{c.name}</p>
                <p className="text-xs text-[var(--color-ink-faint)]">with {c.instructor}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-[var(--color-ink-dim)]">
              <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {c.date} &middot; {c.time} &middot; {c.duration} min</p>
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.room}</p>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-[var(--color-ink-faint)]">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Bookings</span>
                <span>{c.booked}/{c.capacity}</span>
              </div>
              <Progress value={(c.booked / c.capacity) * 100} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

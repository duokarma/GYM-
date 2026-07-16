import { Plus, Dumbbell, Users } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { workoutPrograms } from '@/data/workouts'

export default function WorkoutPrograms() {
  return (
    <div>
      <PageHeader
        title="Workout Programs"
        description={`${workoutPrograms.length} programs in the library`}
        actions={<Button variant="primary" size="sm"><Plus className="h-4 w-4" /> New Program</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {workoutPrograms.map((w) => (
          <Card key={w.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-subtle)]">
                  <Dumbbell className="h-4 w-4 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-[var(--color-ink-faint)]">{w.category}</p>
                </div>
              </div>
              <StatusBadge status={w.status} />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge variant="outline">{w.difficulty}</Badge>
              <Badge variant="outline">{w.duration} weeks</Badge>
              <Badge variant="outline">{w.exercises} exercises</Badge>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]">
              <Users className="h-3.5 w-3.5" /> {w.assignedMembers} members assigned &middot; primary: {w.member}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

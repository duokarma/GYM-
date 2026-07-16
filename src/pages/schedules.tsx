import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { gymClasses } from '@/data/classes'

const timeSlots = ['06:00', '07:30', '09:00', '12:00', '17:30', '18:45', '20:00']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Schedules() {
  return (
    <div>
      <PageHeader title="Schedules" description="Weekly class and trainer schedule grid" />

      <Card className="overflow-x-auto p-5">
        <div className="min-w-[820px]">
          <div className="grid grid-cols-8 gap-2 border-b border-[var(--color-edge)] pb-2">
            <div className="text-xs font-medium text-[var(--color-ink-faint)]">Time</div>
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-[var(--color-ink-faint)]">{d}</div>
            ))}
          </div>
          {timeSlots.map((time, ti) => (
            <div key={time} className="grid grid-cols-8 gap-2 border-b border-[var(--color-edge)] py-2 last:border-0">
              <div className="text-xs text-[var(--color-ink-faint)]">{time}</div>
              {days.map((_, di) => {
                const cls = gymClasses[(ti * 7 + di) % gymClasses.length]
                const show = (ti + di) % 3 !== 0
                return (
                  <div key={di} className="min-h-[52px]">
                    {show && (
                      <div className="rounded-lg bg-[var(--color-success-subtle)] p-1.5 text-center">
                        <p className="truncate text-[11px] font-medium text-[var(--color-success)]">{cls.name}</p>
                        <p className="truncate text-[10px] text-[var(--color-success)]/70">{cls.room}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

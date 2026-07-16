import { Star, Users, Award, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { trainers } from '@/data/trainers'

export default function Trainers() {
  return (
    <div>
      <PageHeader
        title="Trainers"
        description={`${trainers.length} trainers on staff`}
        actions={<Button variant="primary" size="sm"><UserPlus className="h-4 w-4" /> Add Trainer</Button>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {trainers.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12"><AvatarFallback className="text-base">{t.initials}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-playfair text-base font-medium">{t.name}</p>
                <p className="text-xs text-[var(--color-ink-faint)]">{t.specialty}</p>
              </div>
              <Badge variant={t.status === 'active' ? 'success' : t.status === 'on leave' ? 'warning' : 'danger'}>{t.status}</Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.certifications.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-md bg-[var(--color-charcoal-soft)] px-2 py-1 text-[11px] font-medium text-[var(--color-ink-dim)]">
                  <Award className="h-3 w-3" /> {c}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--color-edge)] pt-4 text-center">
              <div>
                <p className="flex items-center justify-center gap-1 font-playfair text-base font-medium"><Star className="h-3.5 w-3.5 fill-[var(--color-warning)] text-[var(--color-warning)]" /> {t.rating}</p>
                <p className="text-[10px] text-[var(--color-ink-faint)]">Rating</p>
              </div>
              <div>
                <p className="flex items-center justify-center gap-1 font-playfair text-base font-medium"><Users className="h-3.5 w-3.5" /> {t.assignedMembers}</p>
                <p className="text-[10px] text-[var(--color-ink-faint)]">Members</p>
              </div>
              <div>
                <p className="font-playfair text-base font-medium">{t.experience}y</p>
                <p className="text-[10px] text-[var(--color-ink-faint)]">Experience</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

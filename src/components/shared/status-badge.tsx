import { Badge } from '@/components/ui/badge'

const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  active: 'success',
  paid: 'success',
  completed: 'success',
  healthy: 'success',
  operational: 'success',
  approved: 'success',
  present: 'success',
  in_stock: 'success',
  pending: 'warning',
  due: 'warning',
  low_stock: 'warning',
  maintenance: 'warning',
  upcoming: 'warning',
  late: 'warning',
  overdue: 'danger',
  expired: 'danger',
  inactive: 'danger',
  out_of_stock: 'danger',
  broken: 'danger',
  cancelled: 'danger',
  absent: 'danger',
  frozen: 'info',
  trial: 'info',
  scheduled: 'info',
  draft: 'neutral',
}

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/\s+/g, '_')
  const variant = map[key] ?? 'neutral'
  return (
    <Badge variant={variant} dot>
      {status}
    </Badge>
  )
}

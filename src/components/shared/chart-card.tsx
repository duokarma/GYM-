import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ChartCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn('rise-in p-5', className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-playfair text-base font-medium text-[var(--color-ink)]">{title}</h3>
          {description && <p className="text-xs text-[var(--color-ink-faint)]">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </Card>
  )
}

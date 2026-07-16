import * as React from 'react'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end', className)}>
      <div>
        <h1 className="font-playfair text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--color-ink-faint)]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

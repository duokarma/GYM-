import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium border',
  {
    variants: {
      variant: {
        neutral: 'bg-[var(--color-charcoal-soft)] text-[var(--color-ink-dim)] border-[var(--color-edge)]',
        success: 'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-transparent',
        info: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border-transparent',
        warning: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-transparent',
        danger: 'bg-[var(--color-danger-subtle)] text-[var(--color-danger)] border-transparent',
        outline: 'bg-transparent text-[var(--color-ink-dim)] border-[var(--color-edge-hover)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }

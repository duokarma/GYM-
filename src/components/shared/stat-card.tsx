import * as React from 'react'
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

export function StatCard({
  label,
  value,
  delta,
  deltaLabel = 'vs last month',
  icon: Icon,
  accent = 'emerald',
  spark,
}: {
  label: string
  value: string
  delta?: number
  deltaLabel?: string
  icon: LucideIcon
  accent?: 'emerald' | 'blue' | 'amber' | 'rose'
  spark?: { v: number }[]
}) {
  const positive = (delta ?? 0) >= 0
  const accentBg = {
    emerald: 'bg-[var(--color-success-subtle)] text-[var(--color-success)]',
    blue: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
    amber: 'bg-[var(--color-warning-subtle)] text-[var(--color-warning)]',
    rose: 'bg-[var(--color-danger-subtle)] text-[var(--color-danger)]',
  }[accent]
  const strokeColor = {
    emerald: 'var(--color-success)',
    blue: 'var(--color-accent)',
    amber: 'var(--color-warning)',
    rose: 'var(--color-danger)',
  }[accent]

  return (
    <Card className="rise-in relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">{label}</p>
          <p className="mt-2 font-playfair text-2xl font-medium text-[var(--color-ink)]">{value}</p>
        </div>
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', accentBg)}>
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {delta !== undefined ? (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-medium',
              positive ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
            <span className="ml-1 font-normal text-[var(--color-ink-faint)]">{deltaLabel}</span>
          </span>
        ) : (
          <span />
        )}
        {spark && (
          <div className="h-8 w-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark}>
                <defs>
                  <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={strokeColor} strokeWidth={1.75} fill={`url(#spark-${label})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  )
}

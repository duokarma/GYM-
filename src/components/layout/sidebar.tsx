import { NavLink } from 'react-router-dom'
import { Dumbbell, X } from 'lucide-react'
import { navSections } from './nav-config'
import { cn } from '@/lib/utils'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col surface-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]">
              <Dumbbell className="h-4 w-4 text-[var(--color-ink)]" strokeWidth={2} />
            </div>
            <div className="leading-none">
              <p className="font-playfair text-[15px] font-semibold text-gradient-brand">Ironclad</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-ink-dim)]">Gym OS</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] lg:hidden">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {navSections.map((section) => (
            <div key={section.label} className="mb-4">
              <p className="px-2.5 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
                        isActive ? 'bg-[var(--color-charcoal)] text-[var(--color-ink)]' : 'text-[var(--color-ink-dim)] hover:bg-[var(--color-charcoal-soft)] hover:text-[var(--color-ink)]'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="pulse-dot absolute left-0 h-4 w-0.5 rounded-full bg-[var(--color-accent)]" />
                        )}
                        <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                        <span className="truncate">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mx-3 mb-4 surface-card p-3.5">
          <p className="text-[11px] font-medium text-[var(--color-ink)]">Studio plan</p>
          <p className="mt-0.5 text-[11px] text-[var(--color-ink-dim)]">3 branches &middot; 24 seats used</p>
        </div>
      </aside>
    </>
  )
}

import { Bell, Menu, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { notifications } from '@/data/notifications'
import { Badge } from '@/components/ui/badge'

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--color-edge)] bg-[rgba(14,16,20,0.6)] px-4 backdrop-blur-xl sm:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-1.5 text-[var(--color-ink-dim)] hover:bg-[var(--color-charcoal)] lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-dim)]" />
        <Input placeholder="Search members, invoices, classes..." className="pl-9 bg-[var(--color-graphite-soft)] border-[var(--color-edge)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus-visible:ring-[var(--color-accent)]" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative rounded-lg p-2 text-[var(--color-ink-dim)] hover:bg-[var(--color-charcoal)]">
              <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-danger)] text-[9px] font-semibold text-[var(--color-ink)]">
                  {unread}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 surface-card border-[var(--color-edge)] shadow-dropdown">
            <DropdownMenuLabel className="text-[var(--color-ink)]">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[var(--color-edge)]" />
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2 focus:bg-[var(--color-charcoal)] focus:text-[var(--color-ink)]">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-[var(--color-ink)]">{n.title}</span>
                  {!n.read && <Badge variant="info" className="bg-[var(--color-accent-subtle)] text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]">new</Badge>}
                </div>
                <span className="text-xs text-[var(--color-ink-dim)]">{n.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-[var(--color-charcoal)]">
              <Avatar className="h-8 w-8 border border-[var(--color-edge)]">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[var(--color-charcoal)] text-[var(--color-ink)]">AK</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-[var(--color-ink)] sm:inline">Aria Kade</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="surface-card border-[var(--color-edge)] shadow-dropdown">
            <DropdownMenuLabel className="text-[var(--color-ink-dim)]">Front Desk Admin</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[var(--color-edge)]" />
            <DropdownMenuItem className="focus:bg-[var(--color-charcoal)] focus:text-[var(--color-ink)]">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[var(--color-charcoal)] focus:text-[var(--color-ink)]">Gym settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[var(--color-edge)]" />
            <DropdownMenuItem className="focus:bg-[var(--color-charcoal)] focus:text-[var(--color-ink)]">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

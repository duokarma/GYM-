import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-charcoal-soft)]">
        <Compass className="h-6 w-6 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
      </div>
      <h1 className="mt-4 font-playfair text-2xl font-medium">Page not found</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-faint)]">The page you're looking for doesn't exist.</p>
      <Button asChild variant="primary" className="mt-5">
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  )
}

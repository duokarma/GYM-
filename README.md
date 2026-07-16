# Ironclad — Premium Gym Management Admin Template

A production-quality, frontend-only admin panel template for gym and fitness studio management. Built to feel like a modern SaaS product (Stripe Dashboard / Linear / Vercel), not a generic Bootstrap admin.

**This is a template.** There is no backend, no database, and no authentication. All data is realistic, deterministic mock JSON living in `src/data/`. It is designed to be wired up to any backend with minimal changes.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first `@theme` token system)
- Radix UI primitives (Dialog, Sheet, Select, Tabs, Dropdown, Switch, Checkbox, Progress, Avatar, Scroll Area)
- TanStack Table (sorting, global search, pagination)
- Recharts (all charts)
- React Router v7
- React Hook Form + Zod (installed, ready for form wiring)
- Sonner (toasts)
- Lucide React (icons)
- Framer Motion (installed)

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. For a production build:

```bash
npm run build
npm run preview
```

## Design Language

- Palette: off-white canvas, white surfaces, deep charcoal sidebar, muted emerald + slate blue accents, amber/rose for warnings.
- Typography: Fraunces (display serif) for headings and big numbers, Inter for UI text, IBM Plex Mono for data figures.
- Motion: subtle fade/rise-in on cards, a pulsing active-nav indicator, smooth Radix transitions.

## Folder Structure

```
src/
  components/
    ui/       Reusable primitives (button, card, table, dialog, sheet, tabs, select, etc.)
    layout/    Sidebar, Topbar, AppLayout, nav config
    shared/    PageHeader, StatCard, ChartCard, DataTable, StatusBadge, EmptyState
  data/        Mock data generators per module
  pages/       One file per route (21 routes, matches the sidebar 1:1)
  lib/         cn() helper, currency/number formatters
  App.tsx      Router + route-level code splitting
```

## Modules Included

Dashboard, Members (profile drawer with tabs), Membership Plans (create/edit/delete dialogs), Attendance (heatmap), Check-ins (mock QR kiosk), Trainers, Classes, Schedules (weekly grid), Payments, Invoices (receipt viewer), Expenses, Equipment, Maintenance, Inventory, Nutrition Plans, Workout Programs, Progress Tracking, Announcements, Support, Reports, Analytics, Settings (multi-tab).

## Wiring Up a Real Backend

1. Replace the arrays exported from `src/data/*.ts` with data-fetching hooks (React Query / SWR recommended).
2. Keep the existing TypeScript interfaces (`Member`, `Trainer`, `Payment`, etc.) as your API contract shape — components are already typed against them.
3. Add real mutations where `toast.success(...)` mocks currently stand in for API calls.
4. Sidebar, tables, and cards are fully responsive; the sidebar collapses to an off-canvas drawer below the `lg` breakpoint.

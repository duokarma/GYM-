import { randInt, pick, daysAgo, fmtDate } from './utils'
import { members } from './members'

export interface Payment {
  id: string
  member: string
  memberId: string
  amount: number
  method: 'Card' | 'UPI' | 'Cash' | 'Bank Transfer'
  status: 'paid' | 'pending' | 'overdue'
  date: string
  invoiceId: string
  plan: string
}

export const payments: Payment[] = Array.from({ length: 80 }).map((_, i) => {
  const m = pick(members)
  return {
    id: `PAY-${5000 + i}`,
    member: m.name,
    memberId: m.id,
    amount: pick([999, 1499, 3999, 8499, 12999, 24999]),
    method: pick(['Card', 'UPI', 'Cash', 'Bank Transfer'] as const),
    status: pick(['paid', 'paid', 'paid', 'paid', 'pending', 'overdue'] as const),
    date: fmtDate(daysAgo(randInt(0, 120))),
    invoiceId: `INV-${9000 + i}`,
    plan: m.plan,
  }
})

export interface Invoice {
  id: string
  member: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  issued: string
  due: string
  tax: number
}

export const invoices: Invoice[] = payments.slice(0, 50).map((p, i) => ({
  id: p.invoiceId,
  member: p.member,
  amount: p.amount,
  status: p.status,
  issued: p.date,
  due: fmtDate(daysAgo(randInt(-30, 0))),
  tax: Math.round(p.amount * 0.18),
}))

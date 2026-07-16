import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { UserPlus, Mail, Phone, Target, Ruler } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { members, type Member } from '@/data/members'
import { payments } from '@/data/payments'
import { checkIns } from '@/data/attendance'
import { formatCurrency, fmtDate } from '@/lib/utils'

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8"><AvatarFallback>{row.original.initials}</AvatarFallback></Avatar>
        <div>
          <p className="text-sm font-medium leading-tight">{row.original.name}</p>
          <p className="text-xs text-[var(--color-ink-faint)]">{row.original.id}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'trainer', header: 'Trainer' },
  {
    accessorKey: 'attendanceRate',
    header: 'Attendance',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Progress value={row.original.attendanceRate} className="w-16" />
        <span className="text-xs text-[var(--color-ink-faint)]">{row.original.attendanceRate}%</span>
      </div>
    ),
  },
  { accessorKey: 'renewal', header: 'Renewal' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
]

export default function Members() {
  const [selected, setSelected] = useState<Member | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = statusFilter === 'all' ? members : members.filter((m) => m.status === statusFilter)
  const memberPayments = selected ? payments.filter((p) => p.memberId === selected.id) : []
  const memberCheckins = selected ? checkIns.filter((c) => c.memberId === selected.id) : []

  return (
    <div>
      <PageHeader
        title="Members"
        description={`${members.length} total members across all plans`}
        actions={<Button variant="primary" size="sm"><UserPlus className="h-4 w-4" /> Add Member</Button>}
      />

      <DataTable
        columns={columns}
        data={filtered}
        searchKey="name"
        searchPlaceholder="Search members by name..."
        onRowClick={(m) => setSelected(m)}
        pageSize={10}
        toolbar={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent widthClassName="max-w-2xl">
          {selected && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12"><AvatarFallback className="text-base">{selected.initials}</AvatarFallback></Avatar>
                  <div>
                    <SheetTitle>{selected.name}</SheetTitle>
                    <SheetDescription>{selected.id} &middot; {selected.plan}</SheetDescription>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-6">
                <Tabs defaultValue="overview">
                  <TabsList className="flex-wrap">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="membership">Membership</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="workout">Workout</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="flex items-center gap-2 p-3 text-sm"><Mail className="h-4 w-4 text-[var(--color-ink-faint)]" /> {selected.email}</Card>
                      <Card className="flex items-center gap-2 p-3 text-sm"><Phone className="h-4 w-4 text-[var(--color-ink-faint)]" /> {selected.phone}</Card>
                      <Card className="flex items-center gap-2 p-3 text-sm"><Target className="h-4 w-4 text-[var(--color-ink-faint)]" /> Goal: {selected.goal}</Card>
                      <Card className="flex items-center gap-2 p-3 text-sm"><Ruler className="h-4 w-4 text-[var(--color-ink-faint)]" /> {selected.height}cm &middot; {selected.weight}kg</Card>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <Card className="p-3 text-center"><p className="font-playfair text-xl">{selected.age}</p><p className="text-xs text-[var(--color-ink-faint)]">Age</p></Card>
                      <Card className="p-3 text-center"><p className="font-playfair text-xl">{selected.bodyFat}%</p><p className="text-xs text-[var(--color-ink-faint)]">Body fat</p></Card>
                      <Card className="p-3 text-center"><p className="font-playfair text-xl">{selected.attendanceRate}%</p><p className="text-xs text-[var(--color-ink-faint)]">Attendance</p></Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="membership">
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-playfair text-lg">{selected.plan}</p>
                          <p className="text-xs text-[var(--color-ink-faint)]">Joined {fmtDate(new Date(selected.joined))}</p>
                        </div>
                        <StatusBadge status={selected.status} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-[var(--color-ink-faint)]">Next renewal</span>
                        <span className="font-medium">{selected.renewal}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-sm">
                        <span className="text-[var(--color-ink-faint)]">Outstanding balance</span>
                        <span className="font-medium">{formatCurrency(selected.balance)}</span>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="attendance">
                    <div className="space-y-2">
                      {memberCheckins.length ? memberCheckins.map((c) => (
                        <div key={c.id} className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3 text-sm">
                          <span>{c.date} &middot; {c.time}</span>
                          <StatusBadge status={c.status} />
                        </div>
                      )) : <p className="text-sm text-[var(--color-ink-faint)]">No check-in records yet.</p>}
                    </div>
                  </TabsContent>

                  <TabsContent value="payments">
                    <div className="space-y-2">
                      {memberPayments.length ? memberPayments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3 text-sm">
                          <div>
                            <p className="font-medium">{formatCurrency(p.amount)}</p>
                            <p className="text-xs text-[var(--color-ink-faint)]">{p.date} &middot; {p.method}</p>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>
                      )) : <p className="text-sm text-[var(--color-ink-faint)]">No payment history yet.</p>}
                    </div>
                  </TabsContent>

                  <TabsContent value="workout">
                    <p className="text-sm text-[var(--color-ink-faint)]">Assigned trainer: <span className="font-medium text-[var(--color-ink)]">{selected.trainer}</span></p>
                    <p className="mt-2 text-sm text-[var(--color-ink-faint)]">No active workout program linked yet. Assign one from Workout Programs.</p>
                  </TabsContent>

                  <TabsContent value="notes">
                    <p className="text-sm text-[var(--color-ink-faint)]">No notes recorded for this member.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

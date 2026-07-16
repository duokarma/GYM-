import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your gym profile, branches, and system preferences" />

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Gym Profile</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="billing">Taxes & Invoices</TabsTrigger>
          <TabsTrigger value="appearance">Theme & Language</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="max-w-2xl space-y-4 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Gym name</Label><Input defaultValue="Ironclad Fitness Studio" /></div>
              <div className="space-y-1.5"><Label>Contact email</Label><Input defaultValue="hello@ironclad.fit" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
              <div className="space-y-1.5"><Label>Business hours</Label><Input defaultValue="6:00 AM - 11:00 PM" /></div>
            </div>
            <div className="space-y-1.5"><Label>Address</Label><Input defaultValue="42 Fitness Lane, Ahmedabad, Gujarat" /></div>
            <Button variant="primary" onClick={() => toast.success('Profile updated')}>Save Changes</Button>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {['Downtown Studio', 'Riverside Branch', 'Uptown Annex'].map((b) => (
              <Card key={b} className="p-4">
                <p className="font-medium">{b}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">Ahmedabad, Gujarat</p>
                <Badge variant="success" className="mt-3">Active</Badge>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="max-w-2xl p-6">
            <div className="space-y-3">
              {['Owner', 'Front Desk Admin', 'Trainer', 'Accountant'].map((role) => (
                <div key={role} className="flex items-center justify-between border-b border-[var(--color-edge)] py-2 last:border-0">
                  <span className="text-sm font-medium">{role}</span>
                  <Badge variant="outline">Full access</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="max-w-2xl space-y-4 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>GST Number</Label><Input defaultValue="24AAAAA0000A1Z5" /></div>
              <div className="space-y-1.5"><Label>Tax rate (%)</Label><Input defaultValue="18" /></div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3">
              <span className="text-sm">Auto-generate invoices on payment</span>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="max-w-2xl space-y-4 p-6">
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3">
              <span className="text-sm">Dark sidebar</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3">
              <span className="text-sm">Compact table rows</span>
              <Switch />
            </div>
            <div className="space-y-1.5"><Label>Language</Label><Input defaultValue="English (India)" /></div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="max-w-2xl space-y-3 p-6">
            {['Renewal reminders', 'Payment reminders', 'Birthday alerts', 'Equipment maintenance alerts'].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-lg border border-[var(--color-edge)] p-3">
                <span className="text-sm">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

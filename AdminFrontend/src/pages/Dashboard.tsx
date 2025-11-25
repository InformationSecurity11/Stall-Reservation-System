import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3x3, CheckCircle2, XCircle, Clock } from 'lucide-react';

// Mock data - replace with API calls
const stats = {
  totalStalls: 150,
  availableStalls: 45,
  reservedStalls: 95,
  pendingStalls: 10,
};

const recentReservations = [
  { id: 'RES-001', businessName: 'Sarasavi Publishers', stallCount: 3, date: '2025-11-08', status: 'confirmed' },
  { id: 'RES-002', businessName: 'Vijitha Yapa', stallCount: 2, date: '2025-11-08', status: 'confirmed' },
  { id: 'RES-003', businessName: 'MD Gunasena', stallCount: 4, date: '2025-11-07', status: 'pending' },
  { id: 'RES-004', businessName: 'Samayawardhana', stallCount: 2, date: '2025-11-07', status: 'confirmed' },
  { id: 'RES-005', businessName: 'Godage Publishers', stallCount: 3, date: '2025-11-06', status: 'confirmed' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of stall reservations and management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stalls</CardTitle>
            <Grid3x3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStalls}</div>
            <p className="text-xs text-muted-foreground">Exhibition capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableStalls}</div>
            <p className="text-xs text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reservedStalls}</div>
            <p className="text-xs text-muted-foreground">Currently occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingStalls}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{reservation.businessName}</p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.id} • {reservation.stallCount} stalls
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{reservation.date}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      reservation.status === 'confirmed'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

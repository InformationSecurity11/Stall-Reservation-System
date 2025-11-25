import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3x3, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useStallStats } from '@/services/apiHooks';
import { reservationService } from '@/services/apiClient';

interface RecentReservation {
  id: string;
  userId?: string;
  businessName: string;
  contactPerson?: string;
  stallIds?: string[];
  stallCount?: number;
  createdAt?: string;
  date?: string;
  status: string;
}

const Dashboard = () => {
  const { data: stats, loading: statsLoading } = useStallStats();
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  // Fetch recent reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await reservationService.getAllReservations();
        // Sort by date and get first 5
        const recent = reservations
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          .map((res: any) => ({
            id: res.id,
            businessName: res.businessName,
            contactPerson: res.contactPerson,
            stallCount: res.stallIds?.length || 0,
            date: res.createdAt?.split('T')[0] || res.createdAt,
            status: res.status?.toLowerCase() === 'confirmed' ? 'confirmed' : 'pending',
          }));
        setRecentReservations(recent);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
        setRecentReservations([]);
      } finally {
        setReservationsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const displayStats = stats || {
    totalStalls: 0,
    availableStalls: 0,
    reservedStalls: 0,
    unavailableStalls: 0,
  };

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
            <div className="text-2xl font-bold">
              {statsLoading ? '-' : displayStats.totalStalls}
            </div>
            <p className="text-xs text-muted-foreground">Exhibition capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '-' : displayStats.availableStalls}
            </div>
            <p className="text-xs text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '-' : displayStats.reservedStalls}
            </div>
            <p className="text-xs text-muted-foreground">Currently occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '-' : displayStats.unavailableStalls}
            </div>
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
            {reservationsLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading reservations...</p>
              </div>
            ) : recentReservations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reservations found</p>
              </div>
            ) : (
              recentReservations.map((reservation) => (
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

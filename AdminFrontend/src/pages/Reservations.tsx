import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { useAllReservations, useCancelReservation } from '@/services/apiHooks';

interface Reservation {
  id: string;
  businessName: string;
  contactPerson?: string;
  stallIds?: string[];
  stallCount?: number;
  createdAt?: string;
  date?: string;
  status: string;
}

const Reservations = () => {
  const { data: apiReservations, loading: reservationsLoading, execute: refetchReservations } = useAllReservations(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const { cancelReservation, loading: cancelLoading } = useCancelReservation();

  // Update reservations when API data changes
  useEffect(() => {
    if (apiReservations) {
      const mapped = apiReservations.map((res: any) => ({
        id: res.id,
        businessName: res.businessName,
        contactPerson: res.contactPerson,
        stallCount: res.stallIds?.length || 0,
        date: res.createdAt?.split('T')[0] || res.createdAt,
        status: res.status?.toLowerCase() === 'confirmed' ? 'Confirmed' : res.status,
      }));
      setReservations(mapped);
    }
  }, [apiReservations]);

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reservation.contactPerson?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const handleCancelReservation = (reservationId: string) => {
    setSelectedReservation(reservationId);
    setShowDialog(true);
  };

  const confirmCancelReservation = async () => {
    if (selectedReservation) {
      try {
        await cancelReservation(selectedReservation);
        toast({
          title: 'Reservation cancelled',
          description: `Reservation ${selectedReservation} has been cancelled. Associated stalls are now available.`,
        });
        await refetchReservations();
      } catch (error: any) {
        toast({
          title: 'Failed to cancel reservation',
          description: error?.message || 'An error occurred',
          variant: 'destructive',
        });
      }
    }
    setShowDialog(false);
    setSelectedReservation(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reservation Management</h1>
        <p className="text-muted-foreground">View and manage all stall reservations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by business name, reservation ID, or contact person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reservations ({filteredReservations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reservationsLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading reservations...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reservation ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Stalls</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No reservations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.id}</TableCell>
                      <TableCell>{reservation.businessName}</TableCell>
                      <TableCell>{reservation.contactPerson || '-'}</TableCell>
                      <TableCell>{reservation.stallCount || 0}</TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelReservation(reservation.id)}
                          disabled={cancelLoading}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel reservation {selectedReservation} and return the associated stalls
              to available status. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep It</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelReservation} disabled={cancelLoading}>
              {cancelLoading ? 'Cancelling...' : 'Yes, Cancel Reservation'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reservations;

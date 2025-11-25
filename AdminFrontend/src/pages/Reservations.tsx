import { useState } from 'react';
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

// Mock data
const mockReservations = [
  {
    id: 'RES-001',
    businessName: 'Sarasavi Publishers',
    contactPerson: 'Nimal Silva',
    stallCount: 3,
    date: '2025-11-08',
    status: 'Confirmed',
  },
  {
    id: 'RES-002',
    businessName: 'Vijitha Yapa',
    contactPerson: 'Kumari Perera',
    stallCount: 2,
    date: '2025-11-08',
    status: 'Confirmed',
  },
  {
    id: 'RES-003',
    businessName: 'MD Gunasena',
    contactPerson: 'Sunil Fernando',
    stallCount: 4,
    date: '2025-11-07',
    status: 'Pending',
  },
  {
    id: 'RES-004',
    businessName: 'Samayawardhana',
    contactPerson: 'Dilini Jayawardena',
    stallCount: 2,
    date: '2025-11-07',
    status: 'Confirmed',
  },
  {
    id: 'RES-005',
    businessName: 'Godage Publishers',
    contactPerson: 'Rohan Wickramasinghe',
    stallCount: 3,
    date: '2025-11-06',
    status: 'Confirmed',
  },
];

const Reservations = () => {
  const [reservations, setReservations] = useState(mockReservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancelReservation = (reservationId: string) => {
    setSelectedReservation(reservationId);
    setShowDialog(true);
  };

  const confirmCancelReservation = () => {
    if (selectedReservation) {
      setReservations(reservations.filter((res) => res.id !== selectedReservation));
      toast({
        title: 'Reservation cancelled',
        description: `Reservation ${selectedReservation} has been cancelled. Associated stalls are now available.`,
      });
    }
    setShowDialog(false);
    setSelectedReservation(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'Cancelled':
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
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.businessName}</TableCell>
                  <TableCell>{reservation.contactPerson}</TableCell>
                  <TableCell>{reservation.stallCount}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelReservation(reservation.id)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            <AlertDialogAction onClick={confirmCancelReservation}>
              Yes, Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reservations;

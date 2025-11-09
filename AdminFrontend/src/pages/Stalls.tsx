import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

// Mock data
const mockStalls = [
  { id: 'S-001', size: 'Small', status: 'Available' },
  { id: 'S-002', size: 'Small', status: 'Reserved' },
  { id: 'S-003', size: 'Medium', status: 'Available' },
  { id: 'S-004', size: 'Medium', status: 'Reserved' },
  { id: 'S-005', size: 'Large', status: 'Available' },
  { id: 'S-006', size: 'Large', status: 'Reserved' },
  { id: 'S-007', size: 'Small', status: 'Unavailable' },
  { id: 'S-008', size: 'Medium', status: 'Available' },
];

const Stalls = () => {
  const [stalls, setStalls] = useState(mockStalls);
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const filteredStalls = stalls.filter((stall) => {
    if (sizeFilter !== 'all' && stall.size !== sizeFilter) return false;
    if (statusFilter !== 'all' && stall.status !== statusFilter) return false;
    return true;
  });

  const handleMarkUnavailable = (stallId: string) => {
    setSelectedStall(stallId);
    setShowDialog(true);
  };

  const confirmMarkUnavailable = () => {
    if (selectedStall) {
      setStalls(
        stalls.map((stall) =>
          stall.id === selectedStall ? { ...stall, status: 'Unavailable' } : stall
        )
      );
      toast({
        title: 'Stall marked as unavailable',
        description: `Stall ${selectedStall} is now unavailable for maintenance.`,
      });
    }
    setShowDialog(false);
    setSelectedStall(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case 'Reserved':
        return <Badge className="bg-warning text-warning-foreground">Reserved</Badge>;
      case 'Unavailable':
        return <Badge variant="destructive">Unavailable</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stall Management</h1>
        <p className="text-muted-foreground">Manage all exhibition stalls</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="w-48">
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stalls ({filteredStalls.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stall ID</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStalls.map((stall) => (
                <TableRow key={stall.id}>
                  <TableCell className="font-medium">{stall.id}</TableCell>
                  <TableCell>{stall.size}</TableCell>
                  <TableCell>{getStatusBadge(stall.status)}</TableCell>
                  <TableCell className="text-right">
                    {stall.status === 'Available' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkUnavailable(stall.id)}
                      >
                        Mark Unavailable
                      </Button>
                    )}
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
            <AlertDialogTitle>Mark Stall as Unavailable?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark stall {selectedStall} as unavailable. It will not be available for
              reservation until marked as available again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMarkUnavailable}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Stalls;

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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle as DTitle,
  DialogDescription as DDescription,
  DialogFooter as DFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockStalls = [
  { id: 'S-001', size: 'Small', price: 500, status: 'Available' },
  { id: 'S-002', size: 'Small', price: 500, status: 'Reserved' },
  { id: 'S-003', size: 'Medium', price: 750, status: 'Available' },
  { id: 'S-004', size: 'Medium', price: 750, status: 'Reserved' },
  { id: 'S-005', size: 'Large', price: 1000, status: 'Available' },
  { id: 'S-006', size: 'Large', price: 1000, status: 'Reserved' },
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

  // Form dialogs state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Create form
  const [newId, setNewId] = useState('');
  const [newSize, setNewSize] = useState<string>('Small');
  const [newStatus, setNewStatus] = useState<string>('Available');

  // Edit form
  const [editId, setEditId] = useState<string | null>(null);
  const [editSize, setEditSize] = useState<string>('Small');
  const [editStatus, setEditStatus] = useState<string>('Available');

  const openEditDialog = () => {
    if (!selectedStall) {
      toast({ title: 'Select a stall', description: 'Please select a stall to edit.' });
      return;
    }
    const s = stalls.find((x) => x.id === selectedStall);
    if (s) {
      setEditId(s.id);
      setEditSize(s.size);
      setEditStatus(s.status);
      setShowEditDialog(true);
    }
  };

  const confirmCreate = () => {
    if (!newId.trim()) {
      toast({ title: 'Invalid ID', description: 'Please provide a valid Stall ID.' });
      return;
    }
    if (stalls.some((s) => s.id === newId)) {
      toast({ title: 'Duplicate ID', description: 'A stall with this ID already exists.' });
      return;
    }
    setStalls([...stalls, { id: newId, size: newSize, status: newStatus }]);
    toast({ title: 'Stall created', description: `Stall ${newId} created.` });
    setShowCreateDialog(false);
    setNewId('');
    setNewSize('Small');
    setNewStatus('Available');
  };

  const confirmEdit = () => {
    if (!editId) return;
    setStalls(
      stalls.map((s) => (s.id === editId ? { ...s, size: editSize, status: editStatus } : s))
    );
    toast({ title: 'Stall updated', description: `Stall ${editId} updated.` });
    setShowEditDialog(false);
    setEditId(null);
  };

  const confirmDelete = () => {
    if (!selectedStall) return;
    setStalls(stalls.filter((s) => s.id !== selectedStall));
    toast({ title: 'Stall deleted', description: `Stall ${selectedStall} deleted.` });
    setSelectedStall(null);
    setShowDeleteDialog(false);
  };

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
          <CardTitle>Manage Stall</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="w-64">
              <Select
                value={selectedStall ?? 'none'}
                onValueChange={(v) => setSelectedStall(v === 'none' ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stall" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">-- Select Stall --</SelectItem>
                  {stalls.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.id} — {s.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 ml-auto">
              <Button onClick={() => setShowCreateDialog(true)}>Create Stall</Button>
              <Button variant="outline" onClick={openEditDialog} disabled={!selectedStall}>
                Edit Stall
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (!selectedStall) {
                    toast({ title: 'Select a stall', description: 'Please select a stall to delete.' });
                    return;
                  }
                  setShowDeleteDialog(true);
                }}
                disabled={!selectedStall}
              >
                Delete Stall
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStalls.map((stall) => (
                <TableRow key={stall.id}>
                  <TableCell className="font-medium">{stall.id}</TableCell>
                  <TableCell>{stall.size}</TableCell>
                  <TableCell>{getStatusBadge(stall.status)}</TableCell>
                  <TableCell className="text-right">{stall.price}</TableCell>
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

      {/* Create Stall Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DTitle>Create Stall</DTitle>
            <DDescription>Fill out the details to create a new stall.</DDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <div>
              <Label>Stall ID</Label>
              <Input value={newId} onChange={(e) => setNewId(e.target.value)} />
            </div>
            <div>
              <Label>Size</Label>
              <Select value={newSize} onValueChange={setNewSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DFooter>
            <Button onClick={confirmCreate}>Create</Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Stall Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DTitle>Edit Stall</DTitle>
            <DDescription>Edit selected stall details.</DDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <div>
              <Label>Stall ID</Label>
              <Input value={editId ?? ''} disabled />
            </div>
            <div>
              <Label>Size</Label>
              <Select value={editSize} onValueChange={setEditSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DFooter>
            <Button onClick={confirmEdit}>Save</Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Stall Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stall?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete stall {selectedStall}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

import { useState, useEffect } from 'react';
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
import { useAllStalls, useCreateStall, useUpdateStall, useDeleteStall, useUpdateStallStatus } from '@/services/apiHooks';

interface Stall {
  id: string;
  size: string;
  price?: number;
  status: string;
  location?: string;
  description?: string;
}

const Stalls = () => {
  const { data: apiStalls, loading: stallsLoading, execute: refetchStalls } = useAllStalls(true);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Form dialogs state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // API hooks
  const { createStall, loading: createLoading } = useCreateStall();
  const { updateStall, loading: updateLoading } = useUpdateStall();
  const { deleteStall, loading: deleteLoading } = useDeleteStall();
  const { updateStatus, loading: statusLoading } = useUpdateStallStatus();

  // Create form
  const [newId, setNewId] = useState('');
  const [newPrice, setNewPrice] = useState<number | null>(null);
  const [newSize, setNewSize] = useState<string>('Small');
  const [newStatus, setNewStatus] = useState<string>('Available');

  // Edit form
  const [editId, setEditId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number | null>(null);
  const [editSize, setEditSize] = useState<string>('Small');
  const [editStatus, setEditStatus] = useState<string>('Available');

  // Update stalls when API data changes
  useEffect(() => {
    if (apiStalls) {
      setStalls(apiStalls);
    }
  }, [apiStalls]);

  const openEditDialog = () => {
    if (!selectedStall) {
      toast({ title: 'Select a stall', description: 'Please select a stall to edit.' });
      return;
    }
    const s = stalls.find((x) => x.id === selectedStall);
    if (s) {
      setEditId(s.id);
      setEditPrice(s.price || 0);
      setEditSize(s.size);
      setEditStatus(s.status);
      setShowEditDialog(true);
    }
  };

  const confirmCreate = async () => {
    if (!newId.trim()) {
      toast({ title: 'Invalid ID', description: 'Please provide a valid Stall ID.' });
      return;
    }
    if (stalls.some((s) => s.id === newId)) {
      toast({ title: 'Duplicate ID', description: 'A stall with this ID already exists.' });
      return;
    }

    try {
      await createStall({
        size: newSize,
        price: newPrice || 0,
        location: newId,
        description: `${newSize} stall`,
      });
      toast({ title: 'Stall created', description: `Stall ${newId} created successfully.` });
      await refetchStalls();
      setShowCreateDialog(false);
      setNewId('');
      setNewPrice(0);
      setNewSize('Small');
      setNewStatus('Available');
    } catch (error: any) {
      toast({
        title: 'Failed to create stall',
        description: error?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const confirmEdit = async () => {
    if (!editId) return;
    try {
      await updateStall(editId, {
        size: editSize,
        price: editPrice || 0,
      });
      toast({ title: 'Stall updated', description: `Stall ${editId} updated successfully.` });
      await refetchStalls();
      setShowEditDialog(false);
      setEditId(null);
    } catch (error: any) {
      toast({
        title: 'Failed to update stall',
        description: error?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const confirmDelete = async () => {
    if (!selectedStall) return;
    try {
      await deleteStall(selectedStall);
      toast({ title: 'Stall deleted', description: `Stall ${selectedStall} deleted successfully.` });
      await refetchStalls();
      setSelectedStall(null);
      setShowDeleteDialog(false);
    } catch (error: any) {
      toast({
        title: 'Failed to delete stall',
        description: error?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
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

  const confirmMarkUnavailable = async () => {
    if (selectedStall) {
      try {
        await updateStatus(selectedStall, 'Unavailable');
        toast({
          title: 'Stall marked as unavailable',
          description: `Stall ${selectedStall} is now unavailable for maintenance.`,
        });
        await refetchStalls();
      } catch (error: any) {
        toast({
          title: 'Failed to update status',
          description: error?.message || 'An error occurred',
          variant: 'destructive',
        });
      }
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
              <Button onClick={() => setShowCreateDialog(true)} disabled={createLoading}>
                Create Stall
              </Button>
              <Button
                variant="outline"
                onClick={openEditDialog}
                disabled={!selectedStall || updateLoading}
              >
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
                disabled={!selectedStall || deleteLoading}
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
          {stallsLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading stalls...</p>
            </div>
          ) : (
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
                    <TableCell className="text-right">{stall.price || '-'}</TableCell>
                    <TableCell className="text-right">
                      {stall.status === 'Available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkUnavailable(stall.id)}
                          disabled={statusLoading}
                        >
                          Mark Unavailable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
              <Label>Price</Label>
              <Input
                type="number"
                value={newPrice ?? ''}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
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
            <Button onClick={confirmCreate} disabled={createLoading}>
              {createLoading ? 'Creating...' : 'Create'}
            </Button>
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
              <Label>Price</Label>
              <Input
                type="number"
                value={editPrice ?? ''}
                onChange={(e) => setEditPrice(Number(e.target.value))}
              />
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
            <Button onClick={confirmEdit} disabled={updateLoading}>
              {updateLoading ? 'Saving...' : 'Save'}
            </Button>
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
            <AlertDialogAction onClick={confirmDelete} disabled={deleteLoading}>
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
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
            <AlertDialogAction onClick={confirmMarkUnavailable} disabled={statusLoading}>
              {statusLoading ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Stalls;

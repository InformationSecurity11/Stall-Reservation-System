import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useAllUsers } from '@/services/apiHooks';

interface Vendor {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  phone?: string;
  reservedStalls?: number;
}

const Vendors = () => {
  const { data: apiUsers, loading: usersLoading } = useAllUsers(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Map API users to vendor format
  useEffect(() => {
    if (apiUsers) {
      const mapped = apiUsers.map((user: any) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        businessName: user.businessName || user.name,
        phone: user.phone || '-',
        reservedStalls: 0, // This would need to be fetched from reservation data
      }));
      setVendors(mapped);
    }
  }, [apiUsers]);

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Directory</h1>
        <p className="text-muted-foreground">View all registered publishers and vendors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by business name, contact person, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading vendors...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Reserved Stalls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No vendors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.id}</TableCell>
                      <TableCell>{vendor.businessName}</TableCell>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>{vendor.phone}</TableCell>
                      <TableCell className="text-right">{vendor.reservedStalls || 0}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Vendors;

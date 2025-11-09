import { useState } from 'react';
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

// Mock data
const mockVendors = [
  {
    id: 'V-001',
    businessName: 'Sarasavi Publishers',
    contactPerson: 'Nimal Silva',
    email: 'nimal@sarasavi.lk',
    phone: '+94 77 123 4567',
    reservedStalls: 3,
  },
  {
    id: 'V-002',
    businessName: 'Vijitha Yapa',
    contactPerson: 'Kumari Perera',
    email: 'kumari@vijithayapa.com',
    phone: '+94 71 234 5678',
    reservedStalls: 2,
  },
  {
    id: 'V-003',
    businessName: 'MD Gunasena',
    contactPerson: 'Sunil Fernando',
    email: 'sunil@gunasena.lk',
    phone: '+94 76 345 6789',
    reservedStalls: 4,
  },
  {
    id: 'V-004',
    businessName: 'Samayawardhana',
    contactPerson: 'Dilini Jayawardena',
    email: 'dilini@samayawardhana.lk',
    phone: '+94 75 456 7890',
    reservedStalls: 2,
  },
  {
    id: 'V-005',
    businessName: 'Godage Publishers',
    contactPerson: 'Rohan Wickramasinghe',
    email: 'rohan@godage.lk',
    phone: '+94 77 567 8901',
    reservedStalls: 3,
  },
  {
    id: 'V-006',
    businessName: 'Lake House Bookshop',
    contactPerson: 'Priya Mendis',
    email: 'priya@lakehouse.lk',
    phone: '+94 71 678 9012',
    reservedStalls: 2,
  },
];

const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.id}</TableCell>
                  <TableCell>{vendor.businessName}</TableCell>
                  <TableCell>{vendor.contactPerson}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell className="text-right">{vendor.reservedStalls}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vendors;

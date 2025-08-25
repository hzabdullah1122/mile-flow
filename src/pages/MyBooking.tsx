import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  reference_number: string;
  booking_type: string;
  collect_from: string;
  deliver_to: string;
  service_type: string;
  description: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  collection_contact: any;
  delivery_contact: any;
  pricing: any;
  status: string;
  vehicle_type: string | null;
  created_at: string;
}

const fetchBookings = async (): Promise<Booking[]> => {
  // ✅ Get logged-in user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not logged in");

  // ✅ Fetch bookings only for this user's email
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      reference_number,
      booking_type,
      collect_from,
      deliver_to,
      service_type,
      description,
      customer_name,
      customer_phone,
      customer_email,
      collection_contact,
      delivery_contact,
      pricing,
      status,
      vehicle_type,
      created_at
    `
    )
    .eq("customer_email", user.email)  // 🔑 filter by user’s email
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "in_progress":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export const BookingsTable = () => {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load bookings data</p>
        </CardContent>
      </Card>
    );
  }

  // ✅ Filter bookings
  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking.reference_number.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      booking.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="w-full shadow-lg border">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            ⬅ Back
          </button>
          <CardTitle className="text-xl font-bold">📦 My Bookings</CardTitle>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Input
            placeholder="Search by reference, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0 z-10">
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center text-muted-foreground py-6"
                    >
                      🚫 No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings?.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-semibold text-indigo-600">
                        {booking.reference_number}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customer_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.customer_email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{booking.booking_type}</Badge>
                      </TableCell>
                      <TableCell>{booking.service_type}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {booking.collect_from}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {booking.deliver_to}
                      </TableCell>
                      <TableCell>
                        {booking.vehicle_type ? (
                          <Badge variant="secondary">{booking.vehicle_type}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {booking.customer_phone}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

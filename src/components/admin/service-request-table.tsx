import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Phone } from "lucide-react";
import {
  getServiceRequests,
  updateServiceStatus,
  type Service,
} from "@/app/actions/service";

// Create a component that will fetch and display all service requests
export default function ServiceRequestsTable({ initialServices }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const router = useRouter();

  // Handle status change
  const handleStatusChange = async (
    id: string,
    newStatus: Service["status"]
  ) => {
    const result = await updateServiceStatus(id, newStatus);
    if (result.success) {
      // Optimistically update the UI
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, status: newStatus } : service
        )
      );
      // Refresh the page to get the updated data from the server
      router.refresh();
    }
  };

  // Function to determine badge color based on status
  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "SUCCESS":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="w-full shadow-md border-green-100 bg-green-50">
      <CardHeader className="bg-green-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">Service Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-32">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No service requests found
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow
                    key={service.id}
                    className="border-b border-green-100 hover:bg-green-50"
                  >
                    <TableCell>
                      {service.image ? (
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                          <Image
                            src={service.image}
                            alt="Service image"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 bg-green-200 rounded-md flex items-center justify-center">
                          <Package className="h-8 w-8 text-green-600" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        Request #{service.id.substring(0, 8)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Weight: {service.approxWeight}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start space-x-1">
                        <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{service.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>{service.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={`${getStatusColor(service.status)}`}>
                          {service.status}
                        </Badge>
                        <Select
                          defaultValue={service.status}
                          onValueChange={(value) =>
                            handleStatusChange(
                              service.id,
                              value as Service["status"]
                            )
                          }
                        >
                          <SelectTrigger className="w-full h-8 text-sm bg-white border-green-200">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">
                              Processing
                            </SelectItem>
                            <SelectItem value="SUCCESS">Success</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

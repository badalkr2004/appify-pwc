"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateGarbageStatus } from "@/actions/admin";

type ServiceStatus = "PENDING" | "PROCESSING" | "COMPLETED";
interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}
interface GarbageReport {
  id: string;
  locationLatitude: string;
  locationLongitude: string;
  garbageType: string;
  status: string;
  description: string;
  image: string;
  dateCreated: Date;
  userId: string;
  user: User;
}

interface GarbageReportTableProps {
  reports: GarbageReport[];
}

export default function GarbageReportTable({
  reports: initialReports,
}: GarbageReportTableProps) {
  const [reports, setReports] = useState<GarbageReport[]>(initialReports);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
  };

  const handleStatusChange = async (id: string, newStatus: ServiceStatus) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await updateGarbageStatus(id, newStatus);
      setReports((prev) =>
        prev.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full border-green-200 shadow-md bg-white">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-green-800">Garbage Reports</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableCaption>
            Current list of reported garbage locations.
          </TableCaption>
          <TableHeader className="bg-green-50">
            <TableRow>
              <TableHead className="w-[180px] text-green-700">
                Date Reported
              </TableHead>
              <TableHead className="text-green-700">Type</TableHead>
              <TableHead className="text-green-700">Description</TableHead>
              <TableHead className="text-green-700">Location</TableHead>
              <TableHead className="text-green-700">Status</TableHead>
              <TableHead className="text-right text-green-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                className="border-b border-green-100 hover:bg-green-50/50"
              >
                <TableCell className="font-medium">
                  {formatDate(report.dateCreated)}
                </TableCell>
                <TableCell>{report.garbageType}</TableCell>
                <TableCell
                  className="max-w-xs truncate"
                  title={report.description}
                >
                  {report.description}
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex flex-col">
                    <span>Lat: {report.locationLatitude}</span>
                    <span>Long: {report.locationLongitude}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`font-normal ${
                      statusColors[report.status as ServiceStatus]
                    }`}
                  >
                    {report.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Select
                      disabled={loading[report.id]}
                      onValueChange={(value) =>
                        handleStatusChange(report.id, value as ServiceStatus)
                      }
                      defaultValue={report.status}
                    >
                      <SelectTrigger className="w-36 border-green-200 focus:ring-green-500">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-100"
                      onClick={() =>
                        window.open(
                          `/admin/trash-reports/${report.id}`,
                          "_blank"
                        )
                      }
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

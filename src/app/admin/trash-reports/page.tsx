// app/garbage/page.tsx
import { Suspense } from "react";
import GarbageReportTable from "@/components/admin/garbage-report-table";
import { fetchGarbageReports, getGarbageStatistics } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic"; // Ensure this page is not statically generated

export default async function GarbageReportsPage() {
  // Fetch data from server actions
  const { data: reports = [] } = await fetchGarbageReports();

  const { data: stats } = await getGarbageStatistics();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Garbage Management System
      </h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700">
                {stats.totalReports}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.reportsByStatus.find((s) => s.status === "PENDING")
                  ?.count || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {stats.reportsByStatus.find((s) => s.status === "COMPLETED")
                  ?.count || 0}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Suspense
        fallback={<div className="text-center p-8">Loading reports...</div>}
      >
        <GarbageReportTable reports={reports} />
      </Suspense>
    </div>
  );
}

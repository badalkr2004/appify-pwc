"use server";

import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type Service = {
  id: string;
  image?: string | null;
  approxWeight: string;
  latitude?: string | null;
  longitude?: string | null;
  phone: string;
  address: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  userId: string;
};

export async function getServiceRequests(): Promise<Service[]> {
  try {
    const services = await client.service.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return services;
  } catch (error) {
    console.error("Failed to fetch service requests:", error);
    return [];
  }
}

// Update service status
export async function updateServiceStatus(
  id: string,
  status: "PENDING" | "PROCESSING" | "COMPLETED"
) {
  try {
    await client.service.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/service-table");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service status:", error);
    return { success: false, error: "Failed to update service status" };
  }
}

export async function fetchGarbageReports() {
  try {
    const reports = await client.garbage.findMany({
      orderBy: {
        dateCreated: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    return { success: true, data: reports };
  } catch (error) {
    console.error("Error fetching garbage reports:", error);
    return { success: false, error: "Failed to fetch garbage reports" };
  }
}

/**
 * Update the status of a garbage report
 */

type ServiceStatus = "PENDING" | "PROCESSING" | "COMPLETED";
export async function updateGarbageStatus(id: string, status: ServiceStatus) {
  try {
    await client.garbage.update({
      where: { id },
      data: { status },
    });

    // Revalidate the garbage list page and the specific garbage detail page
    revalidatePath("/admin/trash-reports");
    revalidatePath(`/admin/trash-reports/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating garbage status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

/**
 * Get total garbage reports statistics
 */

export async function getGarbageStatistics() {
  try {
    const totalReports = await client.garbage.count();

    const reportsByStatus = await client.$queryRaw`
        SELECT status, COUNT(*) as count 
        FROM "Garbage" 
        GROUP BY status
      `;

    const reportsByType = await client.$queryRaw`
        SELECT "garbageType", COUNT(*) as count 
        FROM "Garbage" 
        GROUP BY "garbageType"
      `;

    return {
      success: true,
      data: {
        totalReports,
        reportsByStatus,
        reportsByType,
      },
    };
  } catch (error) {
    console.error("Error fetching garbage statistics:", error);
    return { success: false, error: "Failed to fetch statistics" };
  }
}

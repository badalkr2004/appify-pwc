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

export type StatusCount = {
  status: ServiceStatus;
  count: bigint | number;
};

export type TypeCount = {
  garbageType: string;
  count: bigint | number;
};

export type GarbageStatistics = {
  totalReports: number;
  reportsByStatus: StatusCount[];
  reportsByType: TypeCount[];
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

export async function getGarbageStatistics(): Promise<{
  success: boolean;
  data?: GarbageStatistics;
  error?: string;
}> {
  try {
    const totalReports = await client.garbage.count();

    // Using a safer approach with Prisma's findMany and groupBy
    const statusGroups = await client.garbage.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const typeGroups = await client.garbage.groupBy({
      by: ["garbageType"],
      _count: {
        garbageType: true,
      },
    });

    // Transform to the expected format
    const reportsByStatus: StatusCount[] = statusGroups.map((group) => ({
      status: group.status as ServiceStatus,
      count: group._count.status,
    }));

    const reportsByType: TypeCount[] = typeGroups.map((group) => ({
      garbageType: group.garbageType,
      count: group._count.garbageType,
    }));

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

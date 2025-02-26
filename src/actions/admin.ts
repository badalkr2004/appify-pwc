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

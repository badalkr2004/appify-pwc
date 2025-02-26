"use server";

import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Type definition based on your schema
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

// Fetch all service requests
export async function getServiceRequests(): Promise<Service[]> {
  try {
    // This assumes you're using Prisma with your schema
    const services = await client.service.findMany({
      orderBy: {
        // Most recent first
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

    // Revalidate the services page to show updated data
    revalidatePath("/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service status:", error);
    return { success: false, error: "Failed to update service status" };
  }
}

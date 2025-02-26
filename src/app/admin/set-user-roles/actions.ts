"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  try {
    await client.users.updateUser(formData.get("id") as string, {
      publicMetadata: { role: formData.get("role") },
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const client = await clerkClient();

  try {
    await client.users.updateUser(formData.get("id") as string, {
      publicMetadata: { role: null },
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

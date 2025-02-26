"use server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "../lib/prisma";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        image: user.imageUrl ?? "",
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};

export async function reportGarbage(data: {
  locationLatitude: string;
  locationLongitude: string;
  garbageType: string;
  status: string;
  description: string;
  image: string;
}) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const userExist = await client.user.findUnique({
    where: {
      clerkid: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!userExist) {
    return { success: false, error: "User not found" };
  }

  try {
    const {
      locationLatitude,
      locationLongitude,
      garbageType,
      status,
      description,
      image,
    } = data;

    if (
      !locationLatitude ||
      !locationLongitude ||
      !garbageType ||
      !status ||
      !description ||
      !image
    ) {
      throw new Error("All fields are required.");
    }

    const garbageReport = await client.garbage.create({
      data: {
        userId: userExist.id,
        locationLatitude,
        locationLongitude,
        garbageType,
        status,
        description,
        image,
      },
    });

    return { success: true, data: garbageReport };
  } catch (error) {
    return { success: false, error: error };
  }
}

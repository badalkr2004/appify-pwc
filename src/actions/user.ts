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

export const serviceRequest = async ({
  image,
  approxWeight,
  latitude,
  longitude,
  phone,
  address,
}: {
  image: string;
  approxWeight: string;
  latitude: string;
  longitude: string;
  phone: string;
  address: string;
}) => {
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

  if (
    !image ||
    !approxWeight ||
    !latitude ||
    !longitude ||
    !phone ||
    !address
  ) {
    return { success: false, error: "All fields are required" };
  }
  try {
    const serviceRequest = await client.service.create({
      data: {
        userId: userExist.id,
        image,
        approxWeight,
        latitude,
        longitude,
        phone,
        address,
      },
    });
    console.log(serviceRequest);
    return { success: true, data: serviceRequest };
  } catch (error) {
    return { success: false, message: "failed doorstep servie request", error };
  }
};

export const creditPoints = async () => {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not found" };
  }

  try {
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        credits: true,
      },
    });
    if (!userExist) {
      return { success: false, error: "User not found" };
    }
    return { success: true, data: userExist.credits };
  } catch (error) {
    return { success: false, error: "failed to get credits" + error };
  }
};

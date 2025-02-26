-- CreateTable
CREATE TABLE "Garbage" (
    "id" TEXT NOT NULL,
    "locationLatitude" TEXT NOT NULL,
    "locationLongitude" TEXT NOT NULL,
    "garbageType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Garbage_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "approxWeight" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

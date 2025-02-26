/*
  Warnings:

  - Added the required column `userId` to the `Garbage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garbage" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Garbage" ADD CONSTRAINT "Garbage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

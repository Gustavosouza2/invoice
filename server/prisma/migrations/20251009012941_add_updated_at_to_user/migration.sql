/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_invoiceId_key" ON "public"."File"("invoiceId");

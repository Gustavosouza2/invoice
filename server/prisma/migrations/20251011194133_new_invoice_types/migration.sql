/*
  Warnings:

  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_number` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `labor_cost` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `license_plate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `part_name` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `service_description` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `service_price` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle_model` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,accountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerCnpjOrCpf` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerCnpj` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerMunicipalReg` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceDescription` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceValue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Invoice_license_plate_key";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "token",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Invoice" DROP COLUMN "cost",
DROP COLUMN "customer_name",
DROP COLUMN "date",
DROP COLUMN "invoice_number",
DROP COLUMN "labor_cost",
DROP COLUMN "license_plate",
DROP COLUMN "part_name",
DROP COLUMN "service_description",
DROP COLUMN "service_price",
DROP COLUMN "total_amount",
DROP COLUMN "vehicle_model",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerCnpjOrCpf" TEXT NOT NULL,
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "invoiceNumber" INTEGER NOT NULL,
ADD COLUMN     "issValue" DOUBLE PRECISION,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "netValue" DOUBLE PRECISION,
ADD COLUMN     "providerCnpj" TEXT NOT NULL,
ADD COLUMN     "providerMunicipalReg" TEXT NOT NULL,
ADD COLUMN     "providerName" TEXT NOT NULL,
ADD COLUMN     "serviceDescription" TEXT NOT NULL,
ADD COLUMN     "serviceValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Normal',
ADD COLUMN     "taxRate" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationCode" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "public"."Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "public"."Account"("providerId", "accountId");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

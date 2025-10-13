/*
  Warnings:

  - Added the required column `service_price` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invoice" ADD COLUMN     "service_price" DOUBLE PRECISION NOT NULL;

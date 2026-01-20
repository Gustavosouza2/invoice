-- Align Invoice required/optional fields to product contract
ALTER TABLE "public"."Invoice"
  ALTER COLUMN "issueDate" DROP DEFAULT,
  ALTER COLUMN "issueDate" SET NOT NULL,
  ALTER COLUMN "invoiceNumber" DROP NOT NULL,
  ALTER COLUMN "providerMunicipalReg" DROP NOT NULL,
  ALTER COLUMN "status" DROP NOT NULL;


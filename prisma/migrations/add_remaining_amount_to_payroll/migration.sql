-- AlterTable PayrollRecord - Add remainingAmount column
ALTER TABLE "PayrollRecord" ADD COLUMN "remainingAmount" REAL NOT NULL DEFAULT 0;

-- Update existing records: remainingAmount = totalSalary - paidAmount
UPDATE "PayrollRecord" SET "remainingAmount" = "totalSalary" - "paidAmount";

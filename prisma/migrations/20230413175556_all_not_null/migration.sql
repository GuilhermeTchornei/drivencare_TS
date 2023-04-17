/*
  Warnings:

  - Made the column `doctor_id` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `crm_state_id` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialty_id` on table `doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branch_id` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "doctor_id" SET NOT NULL,
ALTER COLUMN "patient_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "crm_state_id" SET NOT NULL,
ALTER COLUMN "specialty_id" SET NOT NULL,
ALTER COLUMN "branch_id" SET NOT NULL;

/*
  Warnings:

  - Added the required column `expire_date` to the `Licensing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Licensing" ADD COLUMN     "cust_id" VARCHAR(255),
DROP COLUMN "expire_date",
ADD COLUMN     "expire_date" INTEGER NOT NULL;

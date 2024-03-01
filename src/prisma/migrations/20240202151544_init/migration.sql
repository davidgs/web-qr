/*
  Warnings:

  - The `expire_date` column on the `Licensing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Licensing" DROP COLUMN "expire_date",
ADD COLUMN     "expire_date" TIMESTAMP(3);

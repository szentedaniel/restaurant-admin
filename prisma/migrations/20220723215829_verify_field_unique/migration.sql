/*
  Warnings:

  - A unique constraint covering the columns `[verify]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_verify_key` ON `user`(`verify`);

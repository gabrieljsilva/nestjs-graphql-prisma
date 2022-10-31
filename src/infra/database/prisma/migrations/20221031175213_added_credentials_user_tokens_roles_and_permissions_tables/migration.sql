-- CreateEnum
CREATE TYPE "CredentialsStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'WAITING_CONFIRMATION');

-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('UNUSED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCOUNT_CONFIRMATION');

-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "CredentialsStatus" NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "credentialsId" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "status" "TokenStatus" NOT NULL,
    "usageAttempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_credentials_hash_roles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_roles_has_permissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_user_id_key" ON "credentials"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_credentials_hash_roles_AB_unique" ON "_credentials_hash_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_credentials_hash_roles_B_index" ON "_credentials_hash_roles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_roles_has_permissions_AB_unique" ON "_roles_has_permissions"("A", "B");

-- CreateIndex
CREATE INDEX "_roles_has_permissions_B_index" ON "_roles_has_permissions"("B");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_credentials_hash_roles" ADD CONSTRAINT "_credentials_hash_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_credentials_hash_roles" ADD CONSTRAINT "_credentials_hash_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roles_has_permissions" ADD CONSTRAINT "_roles_has_permissions_A_fkey" FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roles_has_permissions" ADD CONSTRAINT "_roles_has_permissions_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

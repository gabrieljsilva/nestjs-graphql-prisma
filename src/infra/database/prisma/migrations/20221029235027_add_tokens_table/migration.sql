-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "credentialsId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

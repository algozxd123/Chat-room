-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT E'unverified',
    "password" TEXT NOT NULL,
    "activateToken" TEXT NOT NULL,
    "activateExpires" TEXT NOT NULL,
    "passwordResetToken" TEXT NOT NULL,
    "passwordResetExpires" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

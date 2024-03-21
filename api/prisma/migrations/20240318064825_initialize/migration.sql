-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "code_language" TEXT NOT NULL,
    "stanndard_input" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddColumn
ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();

-- CreateTable
CREATE TABLE "ListOnUser" (
    "listId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ListOnUser_listId_userId_key" ON "ListOnUser"("listId", "userId");

-- AddForeignKey
ALTER TABLE "ListOnUser" ADD CONSTRAINT "ListOnUser_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOnUser" ADD CONSTRAINT "ListOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

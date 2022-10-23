-- DropForeignKey
ALTER TABLE "ListOnUser" DROP CONSTRAINT "ListOnUser_listId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnLists" DROP CONSTRAINT "ProductsOnLists_listId_fkey";

-- AddForeignKey
ALTER TABLE "ListOnUser" ADD CONSTRAINT "ListOnUser_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnLists" ADD CONSTRAINT "ProductsOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

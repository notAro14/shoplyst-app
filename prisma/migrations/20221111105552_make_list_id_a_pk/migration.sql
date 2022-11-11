-- DropIndex
DROP INDEX "List_id_key" CASCADE;

-- AlterTable
ALTER TABLE "List" ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ListOnUser" ADD CONSTRAINT "ListOnUser_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnLists" ADD CONSTRAINT "ProductsOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;


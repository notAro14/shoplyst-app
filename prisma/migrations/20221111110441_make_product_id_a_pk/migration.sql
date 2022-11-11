-- DropIndex
DROP INDEX "Product_id_key" CASCADE;

-- AlterTable
ALTER TABLE "Product" ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ProductsOnLists" ADD CONSTRAINT "ProductsOnLists_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


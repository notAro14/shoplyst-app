/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticlesOnLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticlesOnLists" DROP CONSTRAINT "ArticlesOnLists_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticlesOnLists" DROP CONSTRAINT "ArticlesOnLists_listId_fkey";

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "ArticlesOnLists";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER
);

-- CreateTable
CREATE TABLE "ProductsOnLists" (
    "productId" INTEGER NOT NULL,
    "listId" TEXT NOT NULL,
    "status" "ArticleStatus" NOT NULL DEFAULT 'READY',
    "detail" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductsOnLists_productId_listId_key" ON "ProductsOnLists"("productId", "listId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnLists" ADD CONSTRAINT "ProductsOnLists_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnLists" ADD CONSTRAINT "ProductsOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

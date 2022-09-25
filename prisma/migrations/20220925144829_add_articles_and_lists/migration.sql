-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('PURCHASED', 'READY');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ArticlesOnLists" (
    "articleId" INTEGER NOT NULL,
    "listId" TEXT NOT NULL,
    "status" "ArticleStatus" NOT NULL DEFAULT 'READY',
    "detail" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "List_id_key" ON "List"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticlesOnLists_articleId_listId_key" ON "ArticlesOnLists"("articleId", "listId");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesOnLists" ADD CONSTRAINT "ArticlesOnLists_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticlesOnLists" ADD CONSTRAINT "ArticlesOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

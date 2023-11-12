-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "completed" BOOLEAN,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

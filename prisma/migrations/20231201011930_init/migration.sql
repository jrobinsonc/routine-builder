-- CreateEnum
CREATE TYPE "DaysList" AS ENUM ('Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su');

-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('Weekday', 'Weekend', 'Everyday', 'Custom');

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isArchived" BOOLEAN DEFAULT false,
    "hasReminder" BOOLEAN DEFAULT false,
    "startTime" TEXT,
    "scheduleType" "ScheduleType" NOT NULL,
    "daysList" "DaysList"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routine_name_key" ON "Routine"("name");

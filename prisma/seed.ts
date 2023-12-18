import prisma from '@/db/client';
import { createRoutine } from '@/db/entities/routine';
import { faker } from '@faker-js/faker';

/**
 * Entry point for seeding the database.
 */
async function main(): Promise<void> {
  await prisma.routine.createMany({
    data: [
      // With reminder, Weekday
      createRoutine({
        name: faker.lorem.words({ min: 2, max: 3 }),
        isArchived: false,
        hasReminder: true,
        startTime: '07:00 AM',
        scheduleType: 'Weekday',
        daysList: undefined,
      }),
      // Without reminder, Custom
      createRoutine({
        name: faker.lorem.words({ min: 2, max: 3 }),
        isArchived: false,
        hasReminder: false,
        startTime: '09:00 AM',
        scheduleType: 'Custom',
        daysList: ['Mo', 'Tu'],
      }),
      // Archived
      createRoutine({
        name: faker.lorem.words({ min: 2, max: 3 }),
        isArchived: true,
        hasReminder: true,
        startTime: '11:00 AM',
        scheduleType: 'Weekday',
        daysList: undefined,
      }),
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

import type { Prisma } from '@prisma/client';
import { object, z } from 'zod';

export type RoutineModel = Prisma.RoutineGetPayload<Record<string, unknown>>;

// eslint-disable-next-line @typescript-eslint/typedef
export const RoutineDays = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
  Sunday: 'Su',
} as const;
// eslint-disable-next-line @typescript-eslint/typedef
export const RoutineSchedule = {
  Weekday: 'Weekday',
  Weekend: 'Weekend',
  Everyday: 'Everyday',
  Custom: 'Custom',
} as const;
// eslint-disable-next-line @typescript-eslint/typedef
const RoutineDefinedSchedule = {
  Weekday: RoutineSchedule.Weekday,
  Weekend: RoutineSchedule.Weekend,
  Everyday: RoutineSchedule.Everyday,
} as const;
// eslint-disable-next-line @typescript-eslint/typedef
const RoutineCustomSchedule = {
  Custom: RoutineSchedule.Custom,
} as const;

// eslint-disable-next-line @typescript-eslint/typedef
const customScheduleSchema = z.object({
  scheduleType: z.nativeEnum(RoutineCustomSchedule),
  daysList: z.array(z.nativeEnum(RoutineDays)).nonempty(),
});
// eslint-disable-next-line @typescript-eslint/typedef
const definedScheduleSchema = z.object({
  scheduleType: z.nativeEnum(RoutineDefinedSchedule),
  daysList: z.undefined(),
});
// eslint-disable-next-line @typescript-eslint/typedef
export const RoutineSchema = z.intersection(
  object({
    id: z.number().optional(),
    name: z.string(),
    isArchived: z.boolean(),
    hasReminder: z.boolean(),
    startTime: z
      .string()
      .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (A|P)M$/, 'Invalid time format'),
  }),
  z.discriminatedUnion('scheduleType', [
    definedScheduleSchema,
    customScheduleSchema,
  ]),
);

/**
 * @param args - Arguments to create a routine.
 * @returns Parsed arguments to create a routine.
 */
export function createRoutine(
  args: Prisma.RoutineCreateInput,
): Prisma.RoutineCreateInput {
  const parsedArgs: Prisma.RoutineCreateInput = {
    ...args,
  };

  return RoutineSchema.parse(parsedArgs);
}

/**
 * @param scheduleType - Schedule type.
 * @param daysList - Days configured.
 * @returns List of days.
 */
export function getDaysLabels(
  scheduleType: RoutineModel['scheduleType'],
  daysList: RoutineModel['daysList'],
) {
  switch (scheduleType) {
    case 'Everyday':
      return [
        RoutineDays.Monday,
        RoutineDays.Tuesday,
        RoutineDays.Wednesday,
        RoutineDays.Thursday,
        RoutineDays.Friday,
        RoutineDays.Saturday,
        RoutineDays.Sunday,
      ];

    case 'Weekday':
      return [
        RoutineDays.Monday,
        RoutineDays.Tuesday,
        RoutineDays.Wednesday,
        RoutineDays.Thursday,
        RoutineDays.Friday,
      ];

    case 'Weekend':
      return [RoutineDays.Saturday, RoutineDays.Sunday];

    case 'Custom':
      return daysList;

    default:
      throw new Error('Invalid days type');
  }
}

import type { DefaultModelProps } from '@/libs/firebase/firestore/Repository';
import { Repository } from '@/libs/firebase/firestore/Repository';
import { z } from 'zod';

export enum RoutineDays {
  Monday = 'Mo',
  Tuesday = 'Tu',
  Wednesday = 'We',
  Thursday = 'Th',
  Friday = 'Fr',
  Saturday = 'Sa',
  Sunday = 'Su',
}

// eslint-disable-next-line @typescript-eslint/typedef
export const RoutineSchema = z.object({
  name: z.string(),
  isArchived: z.boolean(),
  reminder: z.boolean(),
  startTime: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (A|P)M$/),
  days: z
    .object({
      type: z.enum(['Weekday', 'Weekend', 'Everyday']),
      values: z.null(),
    })
    .or(
      z.object({
        type: z.enum(['Custom']),
        values: z.array(z.nativeEnum(RoutineDays)).nonempty(),
      }),
    ),
});

export type RoutineModel = z.infer<typeof RoutineSchema> & DefaultModelProps;

class RoutineRepository extends Repository<RoutineModel> {}

export default Object.freeze({
  get routines() {
    return new RoutineRepository('routines');
  },
});

import { Repository } from '@/libs/firebase/firestore';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/typedef
export const RoutineSchema = z.object({
  name: z.string(),
  isArchived: z.boolean(),
  days: z.object({
    type: z.string(),
    values: z.array(z.string()),
  }),
});

export interface RoutineModel extends z.infer<typeof RoutineSchema> {
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

class RoutineRepository extends Repository<RoutineModel> {}

export default Object.freeze({
  get routines() {
    return new RoutineRepository('routines');
  },
});

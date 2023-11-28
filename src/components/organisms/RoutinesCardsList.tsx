import db from '@/db';
import type { RoutineModel } from '@/db/entities/routines';
import type { ReactElement } from 'react';
import { RoutinesCard } from '../molecules/RoutinesCard';

/**
 * @returns ReactElement
 */
export async function RoutinesCardsList(): Promise<ReactElement> {
  const routines: Map<string, RoutineModel> = await db.routines.get({
    perPage: 1,
    page: 1,
  });

  return (
    <div className="">
      <h1 className="my-4 text-2xl font-semibold">Routines</h1>
      {Array.from(routines.values()).map((routine: RoutineModel) => (
        <RoutinesCard key={routine.name} routine={routine} />
      ))}
    </div>
  );
}

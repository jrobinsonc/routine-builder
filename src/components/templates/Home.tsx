import RoutineCard from '@/components/molecules/RoutineCard';
import type { RoutineModel } from '@/db/entities/routine';
import { type ReactElement } from 'react';

/**
 * @param args - Component args.
 * @param args.routines - Routines.
 * @returns React Element
 */
export default function Home({
  routines,
}: {
  routines: RoutineModel[];
}): ReactElement {
  return (
    <main>
      <h1>Routines {routines.length}</h1>

      {routines.map((routine: RoutineModel) => (
        <RoutineCard key={routine.name} routine={routine} />
      ))}
    </main>
  );
}

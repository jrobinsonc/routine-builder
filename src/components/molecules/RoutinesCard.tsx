import type { RoutineModel } from '@/db/entities/routines';
import { RoutineDays } from '@/db/entities/routines';
import type { ReactElement } from 'react';

/**
 * @param days - Days configured for the routine
 * @returns List of days
 */
function getDaysLabels(days: RoutineModel['days']): RoutineDays[] {
  switch (days.type) {
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
      return days.values;

    default:
      throw new Error('Invalid days type');
  }
}

/**
 * @param props - Props.
 * @param props.routine - Routine data.
 * @returns ReactElement
 */
export function RoutinesCard({
  routine,
}: {
  routine: RoutineModel;
}): ReactElement {
  return (
    <div className="accent-1 mb-4 rounded-lg p-6 shadow-md">
      <span className=" block text-lg">{routine.name}</span>
      <span className="muted-text block text-sm">{routine.startTime}</span>
      <span className="block text-right">
        {getDaysLabels(routine.days).map((day: string) => (
          <span
            className="ml-1 mt-4 inline-block rounded-md border px-1 text-xs"
            key={day}
          >
            {day}
          </span>
        ))}
      </span>
    </div>
  );
}

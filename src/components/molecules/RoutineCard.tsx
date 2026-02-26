'use client';

import type { RoutineDaysValues, RoutineModel } from '@/db/entities/routine';
import { getDaysLabels } from '@/db/entities/routine';
import Icon from '@/libs/icons';
import type { ReactElement } from 'react';

/**
 * @param props - Props.
 * @param props.routine - Routine data.
 * @returns ReactElement
 */
export default function RoutineCard({
  routine,
}: {
  routine: RoutineModel;
}): ReactElement {
  return (
    <div className="bg-color-accent mb-4 rounded-lg p-6 shadow-md">
      <span className="flex justify-between align-middle">
        <span className="block text-lg">{routine.name}</span>
        <Icon
          name="Pencil"
          className="h-6 w-6 rounded-full border p-1 text-muted"
        />
      </span>
      <span className="block text-sm text-muted">{routine.startTime}</span>
      <span className="mt-4 block text-right text-xs">
        {getDaysLabels(routine.scheduleType, routine.daysList).map(
          (day: RoutineDaysValues) => (
            <span
              className="ml-1 inline-flex h-5 w-7 items-center justify-center rounded-md border"
              key={day}
            >
              {day}
            </span>
          ),
        )}
      </span>
    </div>
  );
}

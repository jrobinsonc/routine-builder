import Home from '@/components/templates/Home';
import prisma from '@/db/client';
import type { RoutineModel } from '@/db/entities/routine';
import type { ReactElement } from 'react';

/**
 * @returns ReactElement
 */
export default async function HomePage(): Promise<ReactElement> {
  const routines: RoutineModel[] = await prisma.routine.findMany();

  return <Home routines={routines} />;
}

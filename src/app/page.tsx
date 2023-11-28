import { RoutinesCardsList } from '@/components/organisms/RoutinesCardsList';
import type { ReactElement } from 'react';

/**
 * @returns ReactElement
 */
export default function Home(): ReactElement {
  return (
    <main>
      <RoutinesCardsList />
    </main>
  );
}

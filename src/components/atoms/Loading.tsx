import type { ReactElement } from 'react';

/**
 * Loading component
 *
 * @returns Loading component
 */
export function Loading(): ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-y-2" />
    </div>
  );
}

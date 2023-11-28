import type { ReactElement } from 'react';

/**
 * Loading component
 *
 * @returns Loading component
 */
export function Loading(): ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-y-2 border-white" />
    </div>
  );
}

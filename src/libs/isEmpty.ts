/**
 * Checks if the given argument is empty.
 *
 * Note that this values are not considered empty:
 * - Boolean arguments
 * - Number cero "0"
 *
 * @param arg - The argument to check.
 * @returns `true` if the argument is empty, `false` otherwise.
 */
export default function isEmpty(arg: unknown): boolean {
  if (typeof arg === 'boolean') {
    return false;
  }

  if (arg === undefined || arg === null) {
    return true;
  }

  if (typeof arg === 'string') {
    return arg.trim().length === 0;
  }

  if (typeof arg === 'number') {
    return Number.isNaN(arg);
  }

  if (Array.isArray(arg)) {
    return arg.length === 0;
  }

  if (arg instanceof Map || arg instanceof Set) {
    return arg.size === 0;
  }

  if (typeof arg === 'object') {
    return Object.keys(arg).length === 0;
  }

  throw new Error(`Argument could not be parsed: ${String(arg)}`);
}

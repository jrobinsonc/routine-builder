/**
 * Checks if the provided value is a plain object.
 *
 * If the value is a plain object, the type will narrow down to `Record<string, unknown>`.
 *
 * @param value - The value to check.
 * @returns Returns true if the value is a plain object, otherwise false.
 */
export default function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks if the provided value is null or undefined.
 *
 * @param value - The value to check.
 * @returns Returns true if the value is null or undefined, else false.
 */
export default function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

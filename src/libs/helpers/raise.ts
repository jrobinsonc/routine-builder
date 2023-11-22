/**
 * Raise (throw) an error.
 *
 * It accepts either a string or an Error object as an argument.
 *
 * @param error - The error message or Error object to throw.
 * @throws {Error} - Will throw an error with the provided message or the provided Error object.
 */
export function raise(error: string | Error): never {
  if (typeof error === 'string') {
    throw new Error(error);
  }

  throw error;
}

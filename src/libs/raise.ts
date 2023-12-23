/**
 * Raise (throws) an error.
 *
 * It accepts either a string or an Error object as an argument.
 *
 * @param error - The error message or Error object to throw.
 * @throws Error with the provided message.
 */
export default function raise(error: string | Error): never {
  if (typeof error === 'string') {
    throw new Error(error);
  }

  throw error;
}

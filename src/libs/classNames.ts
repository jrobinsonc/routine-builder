/**
 * @param classes - CSS classes.
 * @returns CSS class names.
 */
export default function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

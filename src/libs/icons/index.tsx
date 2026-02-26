/**
 * Get the SVG Icons from:
 * https://heroicons.com/
 */
import dynamic from 'next/dynamic';
import type { ComponentType, ReactElement } from 'react';

/**
 * @param props - The props of the component.
 * @param props.name - The name of the icon.
 * @param props.className - The class name of the icon.
 * @returns React element.
 */
export default function Icon({
  name,
  className = '',
}: {
  name: 'Pencil';
  className?: string;
}): ReactElement {
  const SvgIconComponent: ComponentType<Record<string, never>> = dynamic(
    async () => import(`./${name}.tsx`),
    {
      ssr: false,
    },
  );

  return (
    <span className={`inline-flex ${className}`}>
      <SvgIconComponent />
    </span>
  );
}

// /**
//  * @param SvgIconComponent - SVG icon component
//  * @returns React component
//  */
// export function withIconWrapper(SvgIconComponent: VFC): VFC {
//   /**
//    * @param props - Component props
//    * @param props.className - Class-name to style the Icon
//    * @returns React element
//    */
//   function Icon({ className }: { className?: string }): ReactElement {
//     return (
//       <span className={`inline-flex ${className ?? ''}`}>
//         <SvgIconComponent />
//       </span>
//     );
//   }

//   return Icon;
// }

// const Pencil: VFC = withIconWrapper(() => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
//     />
//   </svg>
// ));

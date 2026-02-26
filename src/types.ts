/**
 * @file Generic type definitions
 */
import type { FC as BaseFC, PropsWithChildren } from 'react';

export type FC<Props = Record<string, unknown>> = BaseFC<
  PropsWithChildren<Props>
>;
export type VFC<Props = Record<string, unknown>> = BaseFC<Props>;

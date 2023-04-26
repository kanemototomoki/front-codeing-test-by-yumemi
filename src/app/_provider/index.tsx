'use client';

import { ReactNode } from 'react';
import PrefListProvider from './prefListProvider';
import DisplayPrefProvider from './displayPrefProvider';

export type Props = {
  children: ReactNode;
};
export default function RootProvider({ children }: Props) {
  return (
    <PrefListProvider>
      <DisplayPrefProvider>{children}</DisplayPrefProvider>
    </PrefListProvider>
  );
}

export * from './prefListProvider';
export * from './displayPrefProvider';

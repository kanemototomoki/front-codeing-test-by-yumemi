'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { DisplayPref } from '../type';

const DisplayPrefContext = createContext<
  [DisplayPref, Dispatch<SetStateAction<DisplayPref>>] | null
>(null);
export type Props = { children: ReactNode };

export default function DisplayPrefProvider({ children }: Props) {
  const [displayPref, setDisplayPref] = useState<DisplayPref>(new Map());
  return (
    <DisplayPrefContext.Provider value={[displayPref, setDisplayPref]}>
      {children}
    </DisplayPrefContext.Provider>
  );
}

export function useDisplayPref() {
  const context = useContext(DisplayPrefContext);

  if (!context) {
    throw new Error('usePref must be used within a DisplayPrefProvider');
  }

  return context;
}

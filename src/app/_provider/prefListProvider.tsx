'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { PrefDetail } from '../type';

const PrefListContext = createContext<
  | [
      Map<PrefDetail['prefCode'], PrefDetail>,
      Dispatch<SetStateAction<Map<PrefDetail['prefCode'], PrefDetail>>>
    ]
  | null
>(null);
export type Props = { children: ReactNode };

export default function PrefListProvider({ children }: Props) {
  const [prefList, setPrefList] = useState<
    Map<PrefDetail['prefCode'], PrefDetail>
  >(new Map());
  return (
    <PrefListContext.Provider value={[prefList, setPrefList]}>
      {children}
    </PrefListContext.Provider>
  );
}

export function usePrefList() {
  const context = useContext(PrefListContext);

  if (!context) {
    throw new Error('usePref must be used within a PrefListProvider');
  }

  return context;
}

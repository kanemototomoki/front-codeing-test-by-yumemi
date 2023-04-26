'use client';

import { useEffect } from 'react';
import { cn } from '@/utils';
import PrefCheckbox from '../prefCheckbox';
import { usePrefList } from '@/app/_provider';
import { Pref } from '@/app/type';

export type Props = {
  prefList: Pref[];
};

export default function PrefList({ prefList }: Props) {
  const [_prefList, setPrefList] = usePrefList();

  useEffect(() => {
    const map = new Map(_prefList);
    prefList.forEach((item) => {
      map.set(item.prefCode, {
        ...item,
        data: null,
        isSelect: false,
      });
    });
    setPrefList(map);
  }, []);

  return (
    <ul className={cn('grid grid-cols-5 gap-2')}>
      {Array.from(_prefList.values()).map((item) => {
        return (
          <li
            key={item.prefCode}
            className={cn(
              'm-auto w-[160px] hover:underline underline-offset-4'
            )}
          >
            <PrefCheckbox {...item} />
          </li>
        );
      })}
    </ul>
  );
}

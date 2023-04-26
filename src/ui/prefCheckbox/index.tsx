'use client';

import { useDisplayPref } from '@/app/_provider';
import { cn } from '@/utils';

export default function PrefCheckbox({
  prefCode,
  prefName,
}: {
  prefCode: number;
  prefName: string;
}) {
  const [displayPref, setDisplayPref] = useDisplayPref();
  return (
    <label
      htmlFor={prefName}
      className={cn(
        'grid place-items-center grid-cols-[auto_auto] px-4 py-2 border'
      )}
    >
      <input
        id={prefName}
        type='checkbox'
        defaultChecked={displayPref.has(prefCode)}
        onChange={(e) => {
          setDisplayPref((prev) => {
            const newState = new Map(prev);

            e.target.checked
              ? newState.set(prefCode, prefName)
              : newState.delete(prefCode);
            return newState;
          });
        }}
      />
      {prefCode}: {prefName}
    </label>
  );
}

import { cn } from '@/utils';

export default function PrefCheckbox({
  prefCode,
  prefName,
}: {
  prefCode: number;
  prefName: string;
}) {
  return (
    <div
      className={cn(
        'grid place-items-center grid-cols-[1fr_3fr] gap-x-4 px-4 py-2'
      )}
    >
      <input id={prefName} type='checkbox' />
      <label htmlFor={prefName}>{prefName}</label>
    </div>
  );
}

import { cn } from '@/utils';
import PrefCheckbox from '@/ui/prefCheckbox';
const RESAS_API_ENDPOINT = 'https://opendata.resas-portal.go.jp';
export default async function Home() {
  const url = (RESAS_API_ENDPOINT + '/api/v1/prefectures') as string;
  const res = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'X-API-KEY': process.env.RESAS_API_KEY || '',
    },
  });
  const { result } = (await res.json()) as {
    result: {
      prefCode: number;
      prefName: string;
    }[];
  };

  return (
    <main className={cn('m-w-[80vw m-auto')}>
      <ul className={cn('grid grid-cols-5')}>
        {result.map((item) => {
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
    </main>
  );
}

import PrefList from '@/ui/prefList';
import { cn } from '@/utils';
import dynamic from 'next/dynamic';
import RootProvider from './_provider';
import { Pref } from './type';

const RESAS_API_ENDPOINT = 'https://opendata.resas-portal.go.jp';

/**
 * @desc 都道府県一覧を取得する
 * @returns 都道府県一覧
 */
async function getPrefectures(): Promise<{
  result: Pref[];
}> {
  const url = (RESAS_API_ENDPOINT + '/api/v1/prefectures') as string;
  const res = await fetch(url, {
    headers: {
      'X-API-KEY': process.env.RESAS_API_KEY || '',
    },
  });
  return res.json();
}

export default async function Home() {
  const prefectures = await getPrefectures();

  // dynamic import しないとエラーが出る
  // https://github.com/vercel/next.js/issues/12863
  const Chart = dynamic(() => import('@/ui/prefPopulationChart'), {
    ssr: false,
  });

  return (
    <RootProvider>
      <main className={cn('m-w-[80vw m-auto py-10')}>
        <PrefList prefList={prefectures.result} />
        <Chart
          resasApiKey={process.env.RESAS_API_KEY || ''}
          resasApiEndpoint={RESAS_API_ENDPOINT}
        />
      </main>
    </RootProvider>
  );
}

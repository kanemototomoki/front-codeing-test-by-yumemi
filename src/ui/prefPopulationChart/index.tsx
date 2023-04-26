'use client';

import { cn } from '@/utils';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePrefList, useDisplayPref } from '@/app/_provider';
import { Pref, PrefDetail } from '@/app/type';
import { Pretty } from '@/utils';

const colors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#e91e63',
  '#3f51b5',
  '#ff5722',
  '#009688',
  '#ff9800',
  '#4caf50',
  '#9c27b0',
  '#00bcd4',
  '#f44336',
  '#673ab7',
  '#8bc34a',
  '#cddc39',
  '#2196f3',
  '#ffeb3b',
  '#795548',
  '#607d8b',
  '#03a9f4',
  '#9e9e9e',
  '#8a2be2',
  '#7fff00',
  '#dc143c',
  '#00ffff',
  '#008b8b',
  '#b8860b',
  '#a9a9a9',
  '#006400',
  '#bdb76b',
  '#8b008b',
  '#556b2f',
  '#ff8c00',
  '#9932cc',
  '#8b0000',
  '#e9967a',
  '#9400d3',
  '#ff00ff',
  '#ffd700',
  '#008000',
  '#4b0082',
  '#f0e68c',
  '#add8e6',
  '#e0ffff',
  '#90ee90',
  '#d3d3d3',
  '#ffb6c1',
  '#ffffe0',
];

type DataEntry = {
  name: number;
  [key: string]: number;
};

function mergeData(input: DataEntry[][]): DataEntry[] {
  const merged: { [key: number]: DataEntry } = {};

  input.forEach((group) => {
    group.forEach((entry) => {
      if (!merged[entry.name]) {
        merged[entry.name] = { name: entry.name };
      }

      Object.keys(entry).forEach((key) => {
        if (key !== 'name') {
          merged[entry.name][key] = entry[key];
        }
      });
    });
  });

  return Object.values(merged);
}

type Props = {
  resasApiKey: string;
  resasApiEndpoint: string;
};

export default function PrefPopulationChart({
  resasApiKey,
  resasApiEndpoint,
}: Props) {
  const [prefList, setPrefList] = usePrefList();
  const [displayPref] = useDisplayPref();
  const lines = Array.from(displayPref.values()).map((year, i) => {
    return (
      <Line key={year} type='monotone' dataKey={year} stroke={colors[i]} />
    );
  });
  /**
   * @desc 人口構成を取得する
   * @param pref 都道府県
   * @returns 人口構成
   */
  async function getPopulationComposition(prefCode: Pref['prefCode']): Promise<{
    prefCode: Pref['prefCode'];
    prefName: Pref['prefName'];
    result: {
      boundaryYear: number;
      data: {
        label: string;
        data: {
          year: number;
          value: number;
        }[];
      }[];
    };
  }> {
    const url = (resasApiEndpoint +
      `/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`) as string;
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': resasApiKey,
      },
    });

    const json = await res.json();

    return {
      prefCode,
      prefName: prefList.get(prefCode)?.prefName as string,
      result: json.result,
    };
  }

  useEffect(() => {
    const run = async () => {
      const fetchList = Array.from(displayPref.keys()).filter((prefCode) => {
        const pref = prefList.get(prefCode);
        if (pref?.data === null) {
          return prefCode;
        }
      });
      const promises = fetchList.map((prefCode) => {
        return getPopulationComposition(prefCode);
      });
      const promisesResult = await Promise.all(promises);

      setPrefList((prev) => {
        const next = new Map(prev);
        promisesResult.forEach((result) => {
          const pref = next.get(result.prefCode) as PrefDetail;
          next.set(result.prefCode, {
            ...pref,
            data: result.result.data,
          });
        });
        return next;
      });
      const data = promisesResult.map((result, resulti) => {
        const data = result.result.data[0];
        return data.data.map((pref) => {
          return {
            name: `${pref.year}`,
            [promisesResult[resulti].prefName]: pref.value,
          };
        });
      });
    };
    run();
  }, [displayPref]);

  const lineChartData = Array.from(displayPref.keys())
    .map((prefCode) => {
      const pref = prefList.get(prefCode) as Pretty<
        { [K in keyof PrefDetail]: PrefDetail[K] } & {
          data: NonNullable<PrefDetail['data']>;
        }
      >;

      if (pref.data === null) return null;

      const data = pref.data[0].data.map(({ year, value }) => {
        return {
          name: `${year}`,
          [pref.prefName]: value,
        };
      });
      return data;
    })
    .filter((data) => data !== null);

  console.log('lineChartData', lineChartData);
  console.log('displayPref', displayPref);

  const aa = lineChartData ? mergeData(lineChartData) : [];

  return (
    <ResponsiveContainer
      width={800}
      height={300}
      className={cn('mx-auto mt-4')}
    >
      <LineChart data={aa}>
        <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' />
        {lines}
      </LineChart>
    </ResponsiveContainer>
  );
}

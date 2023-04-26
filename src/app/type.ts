import { Pretty } from '@/utils';

export type Pref = {
  prefCode: number;
  prefName: string;
};

export type PrefDetail = Pretty<
  Pref & {
    data:
      | null
      | {
          label: string;
          data: {
            year: number;
            value: number;
          }[];
        }[];
    isSelect: boolean;
  }
>;

export type DisplayPref = Map<Pref['prefCode'], Pref['prefName']>;

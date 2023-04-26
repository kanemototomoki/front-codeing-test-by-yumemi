describe('test', () => {
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

  it('test1', () => {
    const input1 = [
      [
        {
          name: 1960,
          東京都: 100,
        },

        {
          name: 1965,
          東京都: 200,
        },
      ],
      [
        {
          name: 1960,
          大阪府: 300,
        },
        {
          name: 1965,
          大阪府: 400,
        },
      ],
      [
        {
          name: 1960,
          福岡県: 500,
        },
        {
          name: 1965,
          福岡県: 600,
        },
      ],
    ];
    const expected1 = [
      {
        name: 1960,
        東京都: 100,
        大阪府: 300,
        福岡県: 500,
      },
      {
        name: 1965,
        東京都: 200,
        大阪府: 400,
        福岡県: 600,
      },
    ];

    const actual = mergeData(input1);
    expect(actual).toEqual(expected1);
  });

  it('test2', () => {
    const input2 = [
      [
        {
          name: 1960,
          東京都: 100,
        },

        {
          name: 1965,
          東京都: 200,
        },
      ],
    ];
    const expected2 = [
      {
        name: 1960,
        東京都: 100,
      },
      {
        name: 1965,
        東京都: 200,
      },
    ];
    const actual = mergeData(input2);
    expect(actual).toEqual(expected2);
  });
});

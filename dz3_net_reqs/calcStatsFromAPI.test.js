import { calcStatsFromAPI } from "./calcStatsFromAPI";

const loadModule = require('./loadData')

test('mock', async () => {
  const spy = jest.spyOn(loadModule, 'loadData').mockReturnValue([{
    breed: 'Thai Lilac',
    country: 'Thailand',
    origin: 'Natural',
    coat: 'Short',
    pattern: 'Solid'
  },
  {
    breed: 'Tonkinese',
    country: 'Canada',
    origin: 'Crossbreed',
    coat: 'Short',
    pattern: 'Colorpoint/Mink/Solid'
  },
  {
    breed: 'Toyger',
    country: 'United States',
    origin: 'Crossbreed',
    coat: 'Short',
    pattern: 'Mackerel'
  },
  {
    breed: 'Turkish Angora',
    country: 'Turkey',
    origin: 'Natural',
    coat: 'Semi-long',
    pattern: 'All but colorpoint'
  },
  {
    breed: 'Turkish Van',
    country: 'developed in the United Kingdom (founding stock from Turkey)',
    origin: 'Natural',
    coat: 'Semi-long',
    pattern: 'Van'
  },
  {
    breed: 'Ukrainian Levkoy',
    country: 'Ukraine',
    origin: '',
    coat: 'Hairless',
    pattern: ''
  },
  {
    breed: 'York Chocolate',
    country: 'United States (New York)',
    origin: 'Natural',
    coat: 'Long',
    pattern: 'Solid'
  }
  ]);


  let stat = await calcStatsFromAPI();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(stat).toEqual({
    Thailand: 1,
    Canada: 1,
    'United States': 1,
    Turkey: 1,
    'developed in the United Kingdom (founding stock from Turkey)': 1,
    Ukraine: 1,
    'United States (New York)': 1
  })
});
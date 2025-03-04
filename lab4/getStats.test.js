import * as getDataModule from "./getDataFromAPI";
import { getStats } from "./getStats";

test('mock', async () => {
  const spy = jest.spyOn(getDataModule, 'getDataFromAPI').mockReturnValue([
    { category: 'beauty', age: 48 },
    { category: 'beauty', age: 56 },
    { category: 'sport', age: 12 },
    { category: 'beauty', age: 48 },
    { category: 'winter', age: 34 },
    { category: 'sport', age: 94 },
  ]);


  let stat = await getStats();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(stat).toEqual({
    beauty: 3,
    sport: 2,
    winter: 1
  })
});
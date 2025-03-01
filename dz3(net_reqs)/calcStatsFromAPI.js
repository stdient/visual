import { calcStats } from './calcStats.js'
import { loadData } from './loadData.js'

export async function calcStatsFromAPI() {
  let data = await loadData();
  let stat = calcStats(data);
  return stat;
}

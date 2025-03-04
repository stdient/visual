import { getStats } from "./getStats.js";
import { getDataFromAPI } from "./getDataFromAPI.js";

console.log(await getDataFromAPI());
console.log(await getStats());
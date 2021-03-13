import { config } from "./config.js";
import {loadOrCreate} from "./utils/utils.ts";
/**
 * This method takes data passed in and adds the results to the already existing values.
 * it does NOT replace the data
 * @param newData 
 */
export function updateDB(newData: Record<string, number>): Record<string, number> {
  const SYSTEM_DATA = JSON.parse(loadOrCreate(config.db.stats, JSON.stringify({"lastFileSize":0})));
  Object.keys(newData).forEach((val) => {
    SYSTEM_DATA[val] = (SYSTEM_DATA[val] || 0) + newData[val];
  });
  Deno.writeTextFileSync(config.db.stats, JSON.stringify(SYSTEM_DATA));
  return SYSTEM_DATA;
}

/**
 * Sets specific item in the database
 */
export function set(
  file: string,
  key: string,
  value: number | string | boolean,
) {
  const SYSTEM_DATA = JSON.parse(loadOrCreate(file, JSON.stringify({"lastFileSize":0})));
  SYSTEM_DATA[key] = value;
  Deno.writeTextFileSync(file, JSON.stringify(SYSTEM_DATA));
}

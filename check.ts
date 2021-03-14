import { config } from "./config.js";
import { Notify, platypusNotification } from "./notify.ts";
import {loadOrCreate, isPlatypus} from "./utils/utils.ts";
import {getRandomAchievement} from "./data/achievements.ts";
import {COMMANDS} from "https://raw.githubusercontent.com/duart38/BADGESH/main/data/commands.ts?token=AHL2IKOKS3HVPXTXN7K3OTDAKXCVO";
import type {command} from "https://raw.githubusercontent.com/duart38/BADGESH/main/data/commands.ts?token=AHL2IKOKS3HVPXTXN7K3OTDAKXCVO";

const RANGES = levelsToRange(levels(config.levels)).reverse();
/**
 * Given an object that contains the added values of all commands this method goes over each of them and check
 * if they have passed a level by checking against the ranges defined by the levels to range function.
 * This method also saves to an achievement database to prevent re-sending the same achievements on restart
 * @see levelsToRange
 * @see levels
 * @see RANGES and @see rangeFunction
 * @param data 
 */
export function checkLevel(data: Record<string, number>) {
  const ACHIEVEMENTS: {[x: string]: {givenRanges: number[], textValues: string[]}} = JSON.parse(loadOrCreate(config.db.achievements, "{}"));
  let newlyGiven: string[] = [];
  Object.entries(data).forEach(([key, val]) => {
    const currLevel = RANGES.find((x) => x.check(val));
    if(ACHIEVEMENTS[`${key}`] == undefined) ACHIEVEMENTS[`${key}`]= {givenRanges: [], textValues: []};
    if (currLevel && !ACHIEVEMENTS[`${key}`].givenRanges.includes(currLevel.lowerBound)) {
      const str = getRandomAchievement(key)?.build(currLevel.lowerBound) || `🏆: run 🧰 ${key} more than ${currLevel.lowerBound} times`;
      ACHIEVEMENTS[`${key}`].textValues.push(str);
      newlyGiven.push(str);
      if(isPlatypus()){
        platypusNotification(str);
      }else{
        Notify(
          "Achievement", str
        );
      }
      
      ACHIEVEMENTS[`${key}`].givenRanges.push(currLevel.lowerBound);
    }
  });
  Deno.writeTextFileSync(config.db.achievements, JSON.stringify(ACHIEVEMENTS));
  return newlyGiven;
}

/**
 * pokes each line in an array to find keywords @see COMMANDS
 * accumulates these findings (adding duplicate counts to the previous count).
 * @see command
 * @param lines lines array. typically found in the shell's history file. needs to be split by new line
 * @returns the accumulated results.
 */
export function poke(lines: string[]): Record<string, number> {
  const ACCUMULATOR: Record<string, number> = {};
  lines.forEach((cur) => {
    COMMANDS.forEach((cmd) => {
      const matches = [...cur.matchAll(cmd.regex)].length;
      if (matches > 0) {
        ACCUMULATOR[cmd.name] = (ACCUMULATOR[cmd.name] || 0) + matches;
      }
    });
  });
  return ACCUMULATOR;
}

/**
 * Calculates level curve
 * @param levels the amount of levels to increase by(needs to be even)
 * @returns an array of numbers representing the XP required to get there
 */
export function levels(levels: number): number[] {
  if (levels % 2 != 0) {
    throw new Error("levels value need to be an even number");
  }
  let n1 = 1, n2 = 2, nextTerm;
  let temp: number[] = [];
  for (let i = 1; i <= levels; i++) {
    temp.push(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
  }
  return temp;
}

/**
 * an object that contains information about a number range.
 */
export interface rangeFunction {
  // contains the range logic. pass in a number to check if it falls withing the range
  check: (x: number) => boolean;
  //the start of the range
  lowerBound: number;
}

/**
 * Converts an even number of level weights to range functions
 * @param levels 
 */
export function levelsToRange(levels: number[]): rangeFunction[] {
  if (levels.length % 2 != 0) {
    throw new Error("levels array length needs to be even");
  }
  const ranges: rangeFunction[] = [];
  for (let i = 0; i < levels.length - 1; i++) {
    ranges.push({
      check: (x: number) => x >= levels[i] && x < levels[i + 1],
      lowerBound: levels[i],
    });
  }
  ranges.push({
    check: (x: number) => x >= levels[levels.length - 1],
    lowerBound: levels[levels.length - 1],
  });
  return ranges;
}

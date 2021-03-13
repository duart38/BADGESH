import { config } from "./config.js";
import { Notify } from "./notify.ts";
import {COMMANDS} from "./data/commands.ts";

const RANGES = levelsToRange(levels(config.levels)).reverse();
export function checkLevel(data: Record<string, number>) {
  const ACHIEVEMENTS = JSON.parse(Deno.readTextFileSync(config.db.achievements));
  Object.entries(data).forEach(([key, val]) => {
    const currLevel = RANGES.find((x) => x.check(val));
    if(ACHIEVEMENTS[`${key}`] == undefined) ACHIEVEMENTS[`${key}`]=[];
    if (currLevel && !ACHIEVEMENTS[`${key}`].includes(currLevel.lowerBound)) {
      Notify(
        "achievement unlocked", `use ${key} more than ${currLevel.lowerBound} times`
      );
      ACHIEVEMENTS[`${key}`].push(currLevel.lowerBound);
    }
  });
  Deno.writeTextFileSync(config.db.achievements, JSON.stringify(ACHIEVEMENTS));
}

/**
 * pokes each line in an array to find keywords @see COMMANDS
 * @param lines 
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

interface rangeFunction {
  check: (x: number) => boolean;
  /* the start of the range */
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

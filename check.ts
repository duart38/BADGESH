import { config } from "./config.js";
import { Notify } from "./notify.ts";

interface command {
  name: string;
  regex: RegExp;
}
const COMMANDS: command[] = [
  { name: "cd", regex: /cd\s/g },
  { name: "cp", regex: /cp\s/g },
  { name: "rm", regex: /rm\s/g },
  { name: "ls", regex: /ls\s/g },
  { name: "cat", regex: /cat\s/g },
  { name: "less", regex: /less\s/g },
  { name: "echo", regex: /echo\s/g },
  { name: "date", regex: /date/g },
  { name: "sh", regex: /sh\s/g },
  { name: "mkdir", regex: /mkdir\s/g },
  { name: "touch", regex: /touch\s/g },
  { name: "|", regex: /\|/g },
  { name: ">", regex: />/g },
  { name: ">>", regex: />>/g },
  { name: "$", regex: /\$/g },
  { name: "&", regex: /&/g },
  { name: "ssh", regex: /ssh\s/g },
  { name: "sudo", regex: /sudo\s/g },
  { name: "chmod", regex: /chmod\s/g },
  { name: "chown", regex: /chown\s/g },
  { name: "clear", regex: /clear\s/g },
  { name: "curl", regex: /curl\s/g },
];

const RANGES = levelsToRange(levels(config.levels)).reverse();
export function checkLevel(data: Record<string, number>) {
  const ACHIEVEMENTS = JSON.parse(Deno.readTextFileSync("achievements.json"));
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
  Deno.writeTextFileSync("achievements.json", JSON.stringify(ACHIEVEMENTS));
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

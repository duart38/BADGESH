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

/**
 * pokes each line in an array to find keywords @see COMMANDS
 * @param lines 
 * @returns the accumulated results.
 */
export function poke(lines: string[]) {
  let accumulator: any = {};
  lines.forEach((cur) => {
    COMMANDS.forEach((cmd) => {
      const matches = [...cur.matchAll(cmd.regex)].length;
      if (matches > 0) {
        accumulator[cmd.name] = (accumulator[cmd.name] || 0) + matches;
      }
    });
  });
  return accumulator;
}

/**
 * Calculates level curve
 * @param levels the amount of levels to increase by
 * @returns an array of numbers representing the XP required to get there
 */
export function levels(levels: number): number[] {
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

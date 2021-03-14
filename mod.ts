import { poke, checkLevel } from "./check.ts";
import { set, updateDB } from "./db.ts";
import { config } from "./config.js";
import {loadOrCreate} from "./utils/utils.ts";
import CLI from "./CLI.ts";


if(Deno.args.includes("-stats")){
  new CLI(true);
  Deno.exit();
}else if(Deno.args.includes("-h")){
  console.log(CLI.header(), `
    \t| -h                prints this screen
    \t| -stats            only display stats
  `);
  Deno.exit();
}


const textDecoder = new TextDecoder();

enum SHELL {
  zsh = ".zsh_history",
  bash = ".bash_history",
}

export function checkShell(): SHELL {
  const t = Deno.env.get("SHELL") || "bash";
  if (t.endsWith("zsh")) return SHELL.zsh;
  else return SHELL.bash;
}

let dbdata = JSON.parse(loadOrCreate(config.db.stats, JSON.stringify({"lastFileSize":0})));
var lastFileSize = dbdata.lastFileSize;

const screen = new CLI(true);

export async function getHistory(file: string) {
  const { size } = Deno.statSync(file);

  // TODO: chokes on history clear.. maybe completely reset the users badges for trying to cheat
  const NEW_BYTES = size - lastFileSize; // new blocks in bytes

  lastFileSize = size; // update global
  set(config.db.stats, "lastFileSize", size);

  if (NEW_BYTES <= 0) return;

  const newLines = textDecoder.decode(
    await Deno.run({
      cmd: ["tail", "-c", NEW_BYTES.toString(), file],
      stdout: "piped",
    }).output(),
  );
  const ACCUMULATED_COMMANDS = poke(newLines.split("\n"));
  const NEW_DATA = updateDB(ACCUMULATED_COMMANDS);
  const NEW_ACHIEVEMENTS = checkLevel(NEW_DATA);
  NEW_ACHIEVEMENTS.forEach((v)=> screen.addAchievement(v));
  screen.print();
}

const SHELL_HISTORY = `${Deno.env.get("HOME")}/${checkShell()}`;
await getHistory(SHELL_HISTORY);

const watcher = Deno.watchFs(SHELL_HISTORY);
for await (const event of watcher) {
  getHistory(SHELL_HISTORY);
}

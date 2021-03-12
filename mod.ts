import { poke } from "./check.ts";
import { set, updateDB } from "./db.ts";

const textDecoder = new TextDecoder();

enum SHELL {
  zsh = ".zsh_history",
  bash = ".bash_history",
}

export function checkShell(): SHELL {
  const t = Deno.env.get("SHELL") || "zsh";
  if (t.endsWith("zsh")) return SHELL.zsh;
  else return SHELL.bash;
}

var lastFileSize = JSON.parse(Deno.readTextFileSync("db.json")).lastFileSize;
export async function getHistory(file: string) {
  const { size } = Deno.statSync(file);

  // TODO: chokes on history clear.. maybe completely reset the users badges for trying to cheat
  const NEW_BYTES = size - lastFileSize; // new blocks in bytes

  lastFileSize = size; // update global
  set("./db.json", "lastFileSize", size);

  console.log("new bytes", NEW_BYTES);
  if (NEW_BYTES <= 0) return;

  const newLines = textDecoder.decode(
    await Deno.run({
      cmd: ["tail", "-c", NEW_BYTES.toString(), file],
      stdout: "piped",
    }).output(),
  );
  //console.log("new lines", newLines);
  const ACCUMULATED_COMMANDS = poke(newLines.split("\n"));
  updateDB(ACCUMULATED_COMMANDS);
}

const SHELL_HISTORY = `${Deno.env.get("HOME")}/${checkShell()}`;
const watcher = Deno.watchFs(SHELL_HISTORY);
for await (const event of watcher) {
  getHistory(SHELL_HISTORY);
}

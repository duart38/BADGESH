import {poke, updateDB, set, fibonacci} from "./check.ts";

const textDecoder = new TextDecoder();

enum SHELL {
    zsh = ".zsh_history", bash = ".bash_history"
}


export async function checkShell(): Promise<SHELL>{
    const command = ["bash", "-c", `echo $SHELL`];
    const t = textDecoder.decode(await Deno.run({cmd: command, stdout: 'piped'}).output());

    if(t.endsWith("zsh")) return SHELL.zsh
    else return SHELL.bash

}


var lastFileSize = JSON.parse(Deno.readTextFileSync("db.json")).lastFileSize;
export async function getHistory(file = `${Deno.env.get("HOME")}/${SHELL.zsh}`){
    const {size} = Deno.statSync(file);
    
    // TODO: chokes on history clear.. maybe completely reset the users badges for trying to cheat
    const NEW_BYTES = size - lastFileSize; // new blocks in bytes

    lastFileSize = size; // update global
    set("db.json", "lastFileSize", size);

    console.log("new bytes", NEW_BYTES);
    if(NEW_BYTES <= 0) return;

    let newLines = textDecoder.decode(await Deno.run({cmd: ["tail", "-c", NEW_BYTES.toString(), file], stdout: 'piped'}).output());
    //console.log("new lines", newLines);
    const counted_commands = poke(newLines.split("\n"));
    // console.log(counted_commands);
    updateDB(counted_commands);
    
}



const watcher = Deno.watchFs(`${Deno.env.get("HOME")}/${SHELL.zsh}`);
for await (const event of watcher) {
    getHistory();
}
// TODO: make a regex array instead of these commands
const commands: string[] = [
    "cd", "ls", "cat", "less", "echo", "date", "sh", "mkdir", "touch", "|", ";", ">", ">>", "$"
]

interface command {
    name: string,
    regex: RegExp
}
const command_map: command[] = [
    {name: "cd", regex: /cd/g}
]

export function poke(lines: string[]){
    let accumulator: any = {};
    lines.forEach((cur)=>{
        command_map.forEach((cmd)=>{
            const matches = [...cur.matchAll(cmd.regex)].length;
            if(matches > 0){
                accumulator[cmd.name] = (accumulator[cmd.name] || 0) + matches;
            }
        })
    })
    return accumulator;
}

export function updateDB(newData: any){
    let sysdb = JSON.parse(Deno.readTextFileSync("./db.json"))
    Object.keys(newData).forEach((val)=>{
        sysdb[val] = (sysdb[val] || 0) + newData[val]
    });
    Deno.writeTextFileSync("./db.json", JSON.stringify(sysdb));
}

/**
 * Sets specific item in the database
 * @param newData 
 */
export function set(file: string, key: string, value: any){
    let sysdb = JSON.parse(Deno.readTextFileSync("./db.json"))
    sysdb[key] = value;
    Deno.writeTextFileSync("./db.json", JSON.stringify(sysdb));
}
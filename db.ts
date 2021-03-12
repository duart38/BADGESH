export function updateDB(newData: any){
    const SYSTEM_DATA = JSON.parse(Deno.readTextFileSync("./db.json"))
    Object.keys(newData).forEach((val)=>{
        SYSTEM_DATA[val] = (SYSTEM_DATA[val] || 0) + newData[val]
    });
    Deno.writeTextFileSync("./db.json", JSON.stringify(SYSTEM_DATA));
}

/**
 * Sets specific item in the database
 * @param newData 
 */
export function set(file: string, key: string, value: any){
    const SYSTEM_DATA = JSON.parse(Deno.readTextFileSync("./db.json"))
    SYSTEM_DATA[key] = value;
    Deno.writeTextFileSync("./db.json", JSON.stringify(SYSTEM_DATA));
}
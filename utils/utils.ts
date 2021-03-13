export function loadOrCreate(file: string, defaultValue: string): string{
    const cwd = Deno.env.get("PWD");
    try{
        return Deno.readTextFileSync(`${cwd}/${file}`);
    }catch(er){
        //Deno.createSync(`${cwd}/${file}`);
        Deno.writeTextFileSync(`${cwd}/${file}`, defaultValue);
        return Deno.readTextFileSync(`${cwd}/${file}`);
    }
}
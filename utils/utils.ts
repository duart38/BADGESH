export function loadOrCreate(file: string, defaultValue: string): string{
    try{
        return Deno.readTextFileSync(file);
    }catch(er){
        Deno.createSync(file);
        Deno.writeTextFileSync(file, defaultValue);
        return Deno.readTextFileSync(file);
    }
}
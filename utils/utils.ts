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

/**
 * Checks if application is executed with platypus as wrapper
 */
export function isPlatypus(): boolean{
    const cwd = Deno.env.get("PWD");
    try{
        const isFile = Deno.statSync(`${cwd}/platypus`).isFile;
        if(isFile) return true;
        else return false;
    }catch(er){
        return false;
    }
}
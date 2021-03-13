import { notify } from 'https://deno.land/x/deno_notify@0.4.4/ts/prepared.ts';

// type notificationMessage = string;
// export function craftNotification(title: string, message: string, subtitle?:string): notificationMessage{
//     return `display notification "${message}" with title "${title}" ${subtitle ? `subtitle "${subtitle}"` : ""}`;
// }

export function Notify(title: string, message: string){
    notify({ title, message });
}

export function printOut(data: Record<string, number>){
    console.clear();
    let t: {op:string, count: number}[] = [];
    Object.entries(data).forEach(([key, val])=>{
        if(key !== "lastFileSize") t.push({op: key, count: val});
    })
    console.table([...t])
}

export function printOutHTML(data: Record<string, number>){
    console.clear();
    let t = `
    <html>
        <head></head>
        <body>
            ${Object.entries(data).map(([key,val])=>{
                return `<h1>${key} : ${val}</h1>`;
            }).join("\n")}
        </body>
    </html>
    `;
    console.log(t)
}

export function platypusNotification(text: string){
    console.log(`NOTIFICATION:${text}\n`);
}
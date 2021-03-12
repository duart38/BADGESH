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
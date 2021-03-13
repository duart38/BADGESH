export interface command {
    name: string;
    regex: RegExp;
}
export const COMMANDS: command[] = [
    { name: "cd", regex: /cd(|\s)/g },
    { name: "cp", regex: /cp\s/g },
    { name: "rm", regex: /rm\s/g },
    { name: "ls", regex: /ls(|\s)/g },
    { name: "cat", regex: /cat\s/g },
    { name: "less", regex: /less\s/g },
    { name: "echo", regex: /echo\s/g },
    { name: "date", regex: /date/g },
    { name: "sh", regex: /sh\s/g },
    { name: "mkdir", regex: /mkdir\s/g },
    { name: "touch", regex: /touch\s/g },
    { name: "|", regex: /\|/g },
    { name: ">", regex: />/g },
    { name: ">>", regex: />>/g },
    { name: "$", regex: /\$/g },
    { name: "&", regex: /\s&&\s/g },
    { name: "ssh", regex: /ssh\s/g },
    { name: "sudo", regex: /sudo\s/g },
    { name: "chmod", regex: /chmod\s/g },
    { name: "chown", regex: /chown\s/g },
    { name: "clear", regex: /clear(|\s)/g },
    { name: "curl", regex: /curl\s/g },
];
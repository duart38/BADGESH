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
    { name: "npm", regex: /npm\s/g },
    { name: "nvm", regex: /nvm\s/g },
    { name: "firebase", regex: /firebase\s/g },
    { name: "deno", regex: /deno\s/g },
    { name: "gcc", regex: /gcc\s/g },
    { name: "man", regex: /man\s/g },
    { name: "git", regex: /git\s/g },
    { name: "gp", regex: /gp\s/g },
    { name: "code", regex: /code\s/g },
    { name: "vim", regex: /vi(|m)\s/g },
    { name: "node", regex: /node\s/g },
    { name: "grep", regex: /grep\s/g },
    { name: "awk", regex: /awk\s/g },
    { name: "env", regex: /env\s/g },
    { name: "exit", regex: /exit\s/g },
    { name: "gzip", regex: /gzip\s/g },
    { name: "ifconfig", regex: /ifconfig\s/g },

    // flags below..
    { name: "-g", regex: /\s-g(\s|=)/g },
    { name: "-c", regex: /\s-c(\s|=)/g },
    { name: "-a", regex: /\s-a(\s|=)/g },
    { name: "-r", regex: /\s-r(\s|=)/g },
    { name: "-R", regex: /\s-R(\s|=)/g },
    { name: "-rf", regex: /\s-rf\s/g },
    { name: "-v", regex: /\s-v\s/g },
    { name: "--version", regex: /\s--version\s/g },
    { name: "-h", regex: /\s-h\s/g },
    { name: "--help", regex: /\s--help\s/g },
];
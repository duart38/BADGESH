export interface achievement {
    build: (amount: number) => string
}

export const isFlag = (key: string)=> key.startsWith("-");

export const ACHIEVEMENTS: Record<string, achievement[]> = {
    lastFileSize: [
        {build: (n)=> `๐: fat terminal (history >= ${n / 1000000} MB)`},
        {build: (n)=> `๐: "it's growing ๐" (history >= ${n / 1000000} MB)`},
    ],
    ls: [
        {build: (n)=> `๐: ๐งฐ  ls more than ${n} times`},
        {build: (n)=> `๐: what's in here? ๐ (x${n}) `},
        {build: (n)=> `๐: list. list. list. list. list ๐ (x${n}) `},
        {build: (n)=> `๐: short term memory issues (${n}) `},
    ],
    cd: [
        {build: (n)=> `๐: i'm out!! (cd more than ${n} time)`},
        {build: (n)=> `๐: sudo cd? (x${n})`},
        {build: (n)=> `๐: i don't like it here... (cd >= ${n})`},
    ],
    cp: [
        {build: (n)=> `๐: i need that.. (cp >= ${n})`},
        {build: (n)=> `๐: ยฉ Terminal Inc. All rights reserved. (cp -> ${n})`},
        {build: (n)=> `๐: symlinks are a thing you know?. you ran cp ${n} times`},
    ],
    rm: [
        {build: (n)=> `๐: ๐งจ (rm >= ${n})`},
        {build: (n)=> `๐: kill it before it lays eggs (rm >= ${n})`},
        {build: (n)=> `๐: fus ro dah!!`.toUpperCase() + `rm >= ${n}`},
    ],
    cat: [
        {build: (n)=> `๐: miauw miauw (cat >= ${n})`},
        {build: (n)=> `๐: run ๐ฑ ${n} times`},
        {build: (n)=> `๐: "less" is better (cat >= ${n})`},
    ],
    less: [
        {build: (n)=> `๐: more is better (less >= ${n})`},
        {build: (n)=> `๐: it won't fit... (less >= ${n})`},
        {build: (n)=> `๐: TOO BIG.. TOO BIIGG!! (less >= ${n})`}
    ],
    echo: [
        {build: (n)=> `๐: ๐ข ๐ข ๐ข (echo >= ${n})`},
        {build: (n)=> `๐: !!!!!!!!!!!!!!!!!!!!!!!!!!!! (echo >= ${n})`},
        {build: (n)=> `๐: you're a very loud person... (echo >= ${n})`},
    ],
    date: [
        {build: (n)=> `๐: lost track of time. (date >= ${n})`},
        {build: (n)=> `๐: i have a girlfriend. (date >= ${n})`},
        {build: (n)=> `๐: cryosleep user (date >= ${n})`},
    ],
    sh: [
        {build: (n)=> `๐: SHHHHH!... (sh >= ${n})`},
        {build: (n)=> `๐: i don't like chmod +x (sh >= ${n})`},
    ],
    mkdir: [
        {build: (n)=> `๐: a box here... a box there... (mkdir >= ${n})`},
        {build: (n)=> `๐: there's a folder for everything (mkdir >= ${n})`},
    ],
    touch: [
        {build: (n)=> `๐: touching(x${n}) without asking for consent?`},
        {build: (n)=> `๐: can i touch you? (x${n})`},
    ],
    "|":[
        {build: (n)=> `๐: i like to "pipe" (${n}) stuff`},
        {build: (n)=> `๐: pipefitter ( | >= ${n})`},
    ],
    code: [
        {build: (n)=> `๐: where did i leave my editor? (code >= ${n})`},
        {build: (n)=> `๐: i can't use vim (code >= ${n})`},
    ],
    vim: [
        {build: (n)=> `๐: GET ME OUT OF HERE!!! (vim >= ${n})`}
    ],
    ifconfig: [
        {build: (n)=> `๐: false (ifconfig >= ${n})`},
    ],
    env: [
        {build: (n)=> `๐: env -> ${Deno.env.toObject.toString()}`},
    ],
    curl: [
        {build: (n)=> `๐: spaghetti. (curl ~ ${n})`},
        {build: (n)=> `๐: โฐ x${n}`},
    ],
    git:[
        {build: (n)=> `๐: git add .; git commit -m ""; gp (${n})`},
        {build: (n)=> `๐: deployment day! (git ${n})`},
    ]
}
export function getRandomAchievement(command: string): achievement | undefined {
    if(!ACHIEVEMENTS[command]) return undefined;
    return ACHIEVEMENTS[command][Math.floor(Math.random() * ACHIEVEMENTS[command].length) | 0];
}
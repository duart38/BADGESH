export interface achievement {
    build: (amount: number) => string
}

export const isFlag = (key: string)=> key.startsWith("-");

export const ACHIEVEMENTS: Record<string, achievement[]> = {
    lastFileSize: [
        {build: (n)=> `🏆: fat terminal (history >= ${n / 1000000} MB)`},
        {build: (n)=> `🏆: "it's growing 🍆" (history >= ${n / 1000000} MB)`},
    ],
    ls: [
        {build: (n)=> `🏆: 🧰  ls more than ${n} times`},
        {build: (n)=> `🏆: what's in here? 👀 (x${n}) `},
        {build: (n)=> `🏆: list. list. list. list. list 📑 (x${n}) `},
        {build: (n)=> `🏆: short term memory issues (${n}) `},
    ],
    cd: [
        {build: (n)=> `🏆: i'm out!! (cd more than ${n} time)`},
        {build: (n)=> `🏆: sudo cd? (x${n})`},
        {build: (n)=> `🏆: i don't like it here... (cd >= ${n})`},
    ],
    cp: [
        {build: (n)=> `🏆: i need that.. (cp >= ${n})`},
        {build: (n)=> `🏆: © Terminal Inc. All rights reserved. (cp -> ${n})`},
        {build: (n)=> `🏆: symlinks are a thing you know?. you ran cp ${n} times`},
    ],
    rm: [
        {build: (n)=> `🏆: 🧨 (rm >= ${n})`},
        {build: (n)=> `🏆: kill it before it lays eggs (rm >= ${n})`},
        {build: (n)=> `🏆: fus ro dah!!`.toUpperCase() + `rm >= ${n}`},
    ],
    cat: [
        {build: (n)=> `🏆: miauw miauw (cat >= ${n})`},
        {build: (n)=> `🏆: run 🐱 ${n} times`},
        {build: (n)=> `🏆: "less" is better (cat >= ${n})`},
    ],
    less: [
        {build: (n)=> `🏆: more is better (less >= ${n})`},
        {build: (n)=> `🏆: it won't fit... (less >= ${n})`},
        {build: (n)=> `🏆: TOO BIG.. TOO BIIGG!! (less >= ${n})`}
    ],
    echo: [
        {build: (n)=> `🏆: 📢 📢 📢 (echo >= ${n})`},
        {build: (n)=> `🏆: !!!!!!!!!!!!!!!!!!!!!!!!!!!! (echo >= ${n})`},
        {build: (n)=> `🏆: you're a very loud person... (echo >= ${n})`},
    ],
    date: [
        {build: (n)=> `🏆: lost track of time. (date >= ${n})`},
        {build: (n)=> `🏆: i have a girlfriend. (date >= ${n})`},
        {build: (n)=> `🏆: cryosleep user (date >= ${n})`},
    ],
    sh: [
        {build: (n)=> `🏆: SHHHHH!... (sh >= ${n})`},
        {build: (n)=> `🏆: i don't like chmod +x (sh >= ${n})`},
    ],
    mkdir: [
        {build: (n)=> `🏆: a box here... a box there... (mkdir >= ${n})`},
        {build: (n)=> `🏆: there's a folder for everything (mkdir >= ${n})`},
    ],
    touch: [
        {build: (n)=> `🏆: touching(x${n}) without asking for consent?`},
        {build: (n)=> `🏆: can i touch you? (x${n})`},
    ],
    "|":[
        {build: (n)=> `🏆: i like to "pipe" (${n}) stuff`},
        {build: (n)=> `🏆: pipefitter ( | >= ${n})`},
    ],
    code: [
        {build: (n)=> `🏆: where did i leave my editor? (code >= ${n})`},
        {build: (n)=> `🏆: i can't use vim (code >= ${n})`},
    ],
    vim: [
        {build: (n)=> `🏆: GET ME OUT OF HERE!!! (vim >= ${n})`}
    ],
    ifconfig: [
        {build: (n)=> `🏆: false (ifconfig >= ${n})`},
    ],
    env: [
        {build: (n)=> `🏆: env -> ${Deno.env.toObject.toString()}`},
    ],
    curl: [
        {build: (n)=> `🏆: spaghetti. (curl ~ ${n})`},
        {build: (n)=> `🏆: ➰ x${n}`},
    ],
    git:[
        {build: (n)=> `🏆: git add .; git commit -m ""; gp (${n})`},
        {build: (n)=> `🏆: deployment day! (git ${n})`},
    ]
}
export function getRandomAchievement(command: string): achievement | undefined {
    if(!ACHIEVEMENTS[command]) return undefined;
    return ACHIEVEMENTS[command][Math.floor(Math.random() * ACHIEVEMENTS[command].length) | 0];
}
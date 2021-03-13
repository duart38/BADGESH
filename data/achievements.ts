export interface achievement {
    build: (amount: number) => string
}

export const isFlag = (key: string)=> key.startsWith("-");

export const ACHIEVEMENTS: Record<string, achievement[]> = {
    lastFileSize: [
        {build: (n)=> `🏆: fat terminal (history >= ${n * 1000000} MB)`},
        {build: (n)=> `🏆: "it's growing 🍆" (history >= ${n * 1000000} MB)`},
    ],
    ls: [
        {build: (n)=> `🏆: 🧰  ls more than ${n} times`},
        {build: (n)=> `🏆: what's in here? (x${n}) `},
        {build: (n)=> `🏆: list. list. list. list. list (x${n}) `},
        {build: (n)=> `🏆: short term memory issues (${n}) `},
    ]
}
export function getRandomAchievement(command: string): achievement | undefined {
    console.log(ACHIEVEMENTS[command]);
    if(!ACHIEVEMENTS[command]) return undefined;
    return ACHIEVEMENTS[command][Math.floor(Math.random() * ACHIEVEMENTS[command].length) | 0];
}
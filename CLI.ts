import Interpolation from "https://raw.githubusercontent.com/duart38/Interpolate/master/Interpolate.ts";
import { loadOrCreate } from "./utils/utils.ts";
import { config } from "./config.js";
export default class CLI {
  private screen: Interpolation;
  private achievements: string[];
  constructor(loadFromFile: boolean) {
    this.screen = new Interpolation(`\n\n
${CLI.header()}
{{Achievements}}                                                                                        
\t------------------------------------------------------------------------------------------------------
`);
    this.achievements = [];
    this.flush();
    if (loadFromFile) this.loadFromFile();
  }

  static header(): string {
      return `\t     ___           ___           ___           ___           ___           ___           ___     
      \t    /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\__\\    
      \t   /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /:/  /    
      \t  /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\ \\  \\     /:/__/     
      \t /::\\~\\:\\__\\   /::\\~\\:\\  \\   /:/  \\:\\__\\   /:/  \\:\\  \\   /::\\~\\:\\  \\   _\\:\\~\\ \\  \\   /::\\  \\ ___ 
      \t/:/\\:\\ \\:|__| /:/\\:\\ \\:\\__\\ /:/__/ \\:|__| /:/__/_\\:\\__\\ /:/\\:\\ \\:\\__\\ /\\ \\:\\ \\ \\__\\ /:/\\:\\  /\\__\\
      \t\\:\\~\\:\\/:/  / \\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\  /\\ \\/__/ \\:\\~\\:\\ \\/__/ \\:\\ \\:\\ \\/__/ \\/__\\:\\/:/  /
      \t \\:\\ \\::/  /       \\::/  /   \\:\\  /:/  /   \\:\\ \\:\\__\\    \\:\\ \\:\\__\\    \\:\\ \\:\\__\\        \\::/  / 
      \t  \\:\\/:/  /        /:/  /     \\:\\/:/  /     \\:\\/:/  /     \\:\\ \\/__/     \\:\\/:/  /        /:/  /  
      \t   \\::/__/        /:/  /       \\::/__/       \\::/  /       \\:\\__\\        \\::/  /        /:/  /   
      \t    ~~            \\/__/         ~~            \\/__/         \\/__/         \\/__/         \\/__/    
      \t------------------------------------------------------------------------------------------------------`
  }

  /**
   * Adds achievement. does not print
   * @param txt
   */
  public addAchievement(txt: string) {
    this.achievements.push(txt);
  }

  public loadFromFile() {
    const ACHIEVEMENTS: {
      [x: string]: { givenRanges: number[]; textValues: string[] };
    } = JSON.parse(loadOrCreate(config.db.achievements, "{}"));
    Object.values(ACHIEVEMENTS).forEach((val) =>
      val.textValues.forEach((x) => this.addAchievement(x))
    );
    
    this.print();
  }

  public print() {
    let a = ``;
    const sortedAchievements = [...this.achievements].sort((a, b) => b.length - a.length);
    const longestLength = sortedAchievements[0]?.trimEnd().length || 0;
    if(longestLength == 0 ) a = "\t No achievements found."

    function paddedFill(data: string, charAmount: number) {
      if (data.length < charAmount) return data + " ".repeat(charAmount - data.length);
      else return data.substring(0,charAmount - 3) + "...";
    }

    for (let i = 0; i < sortedAchievements.length - 1; i += 2) {
      const left = this.achievements[i] || "";
      const right = this.achievements[i + 1];
      a += "\t| " + paddedFill(left, longestLength - 1) + " | " + paddedFill(right, 97 - longestLength) + "|\n";
    }
    this.screen.reset();
    this.screen.fill("Achievements", a);
  }

  /**
   * Flushes the toilet to stdout (the toilet hole).
   * anyways.. only to be called once... you know the drill...
   */
  private flush() {
    this.screen.bind((x) => {
      console.clear();
      console.log(x);
    });
  }
}

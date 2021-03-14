import Interpolation from "https://raw.githubusercontent.com/duart38/Interpolate/master/Interpolate.ts";
export default class CLI {
    private screen: Interpolation;
    private achievements: string[] = [];
    constructor(){
        this.screen = new Interpolation(`
         ___           ___           ___           ___           ___           ___           ___     
        /\  \         /\  \         /\  \         /\  \         /\  \         /\  \         /\__\    
       /::\  \       /::\  \       /::\  \       /::\  \       /::\  \       /::\  \       /:/  /    
      /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\ \  \     /:/__/     
     /::\~\:\__\   /::\~\:\  \   /:/  \:\__\   /:/  \:\  \   /::\~\:\  \   _\:\~\ \  \   /::\  \ ___ 
    /:/\:\ \:|__| /:/\:\ \:\__\ /:/__/ \:|__| /:/__/_\:\__\ /:/\:\ \:\__\ /\ \:\ \ \__\ /:/\:\  /\__\
    \:\~\:\/:/  / \/__\:\/:/  / \:\  \ /:/  / \:\  /\ \/__/ \:\~\:\ \/__/ \:\ \:\ \/__/ \/__\:\/:/  /
     \:\ \::/  /       \::/  /   \:\  /:/  /   \:\ \:\__\    \:\ \:\__\    \:\ \:\__\        \::/  / 
      \:\/:/  /        /:/  /     \:\/:/  /     \:\/:/  /     \:\ \/__/     \:\/:/  /        /:/  /  
       \::/__/        /:/  /       \::/__/       \::/  /       \:\__\        \::/  /        /:/  /   
        ~~            \/__/         ~~            \/__/         \/__/         \/__/         \/__/    
    -------------------------------------------------------------------------------------------------
        {{Achievements1}}                                                 {{Achievements2}}          
    -------------------------------------------------------------------------------------------------
        {{Stats}}                                                                                    
                                                                                                     
        `);

        this.flush();
    }

    /**
     * Adds achievement to screen boi
     * @param txt 
     */
    public addAchievement(txt: string){
        this.achievements.push(txt);
        const t = ``;

        this.achievements.forEach((str)=>{
            
        })

    }

    public loadFromFile(file: string){

    }

    /**
     * Flushes the toilet to stdout (the toilet hole).
     * anyways.. only to be called once... you know the drill...
     */
    private flush(){
        this.screen.bind((x)=>{
            console.clear();
            console.log(x);
        })
    }
    

}
export type GameInfo = {
    Name: string ; // name of game
    Id : string ; // game id
    Instruction: string ; // string representing the first game instruction
    Deadline: number ; // date the game is due
    Icon?: string  ; // url of image icon for the game
}

export type User = {
    name: string ; // name of user
    id: string; // user id
    assignments: string[]; //array of game names they're assigned to 
    scores: Record<string, number>; // map from gamename to user's score in that game  
    inventory: Record<string, string[]>; // map from gamename to user's inventory in that game 
}

export class GameBackend {
    private users: User[]; // Users Database
    private games: GameInfo[]; // Game Info Database

    constructor(players: User[], games: GameInfo[]) {
        this.users = players;
        this.games = games;
    }

    // Getter method for gameName
    get getUsers(): User[] {
        return this.users;
    }

    // Getter method for playerCount
    get getGames(): GameInfo[] {
        return this.games;
    }
}
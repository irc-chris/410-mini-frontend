export type GameInfo = {
    game_id : string; // unique game id
    name: string; // name of game
    user_id: string; // user that created the game (partition key)
    playable: boolean; // monitors if the game is available to play (published)
    world: Location[]; // array of locations in the game world
    user_save_states: Record<string, SaveState>; // map of users to their save states
    player_beginning_stat: Record<string, any>; // initial attributes for a player
}

export type User = {
    user_id: string; // unique user id
    username: string; // name of user
    token: string; // authentication token
    password: string; // password for authentication
    game_permissions: string[]; // games available for user to play
    game_sessions: string[]; // games where player has saved progress
    games_created: string[]; // games created by the user
}

export type Location = {
    location_id: string; // unique location id
    game_id: string; // associated game id (partition key)
    aliases: string[]; // alternative names for this location
    description: string; // location description
    exits: Location[]; // accessible locations
    entities: Entity[]; // entities present in this location
}

export type SaveState = {
    game_id: string; // associated game id (partition key)
    player: User; // player this save state belongs to
    inventory: Entity[]; // items in user's inventory
    attributes: Record<string, any>; // custom properties
    last_location: Location; // last saved location
}

export type Entity = {
    location_id: string; // location this entity belongs to (partition key)
    name: string; // name of the entity
    description: string; // description of the entity
    events: string[]; // triggered events
    event_triggers: string[]; // actions that trigger events
    probabilistic: boolean; // determines if events are random
    attributes: Record<string, any>; // custom properties
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
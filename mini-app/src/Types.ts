export type Game = {
    game_id: string;                     // Unique identifier for this game
    name: string;                        // Name for the game
    user_id: string;                     // ID of the user that created this game (partition key)
    playable: boolean;                   // Whether the game is published (non-editable) or not
    world: Location[];                   // Array of locations within the game world
    user_save_states: { [userId: string]: SaveState }; // Map from user IDs to their save states
    player_beginning_stat: any;          // JSON object for initial player attributes. If all fields are null, players choose their own within limits.
  };
  
  export type Location = {
    location_id: string;     // Unique identifier for this location
    game_id: string;         // Identifier for the associated game (partition key)
    aliases: string[];       // Alternative names for the location (e.g., "WhiteHouse", "whiteHouse", "whitehouse")
    description: string;     // Description to show upon entering or examining the location
    exits: Location[];       // Array of locations accessible from this location
    entities: Entity[];      // Array of entities (items, NPCs, etc.) present in this location
  };
  
  export type SaveState = {
    game_id: string;                // Identifier for the game this save state is associated with (partition key)
    player: User;                   // The user/player to whom this save state belongs
    inventory: Entity[];            // Array of items/entities in the player's inventory
    attributes?: any;
  };
  
  export type Entity = {
    id: string;                     // Unique identifier for the entity (e.g., "item-001", "npc-001")
    location_id: string;            // Identifier of the location with which this entity is associated (partition key)
    name: string;                   // Name of the entity (e.g., "button", "sword")
    description: string;            // Description for the entity
    events: string[];               // Array of event strings triggered on interaction (e.g., "minus_hp(10)")
    event_triggers: string[];       // Actions that trigger the events (e.g., "press", "use")
    probabilistic: boolean;         // If true, events occur randomly based on probability; otherwise, they occur in the order listed
    attributes: any;                // Custom JSON properties (e.g., { "hp": 10 })
  };
  
  export type User = {
    user_id: string;         // Unique identifier for the user
    username: string;        // Username
    token: string;           // Authentication token
    password: string;        // Password for authentication
    game_permissions: Game[];// Array of games available for the user to play
    game_sessions: Game[];   // Array of games in which the user has made progress
    games_created: Game[];   // Array of games the user has created
  };
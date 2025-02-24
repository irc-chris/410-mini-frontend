import {Game, Location, SaveState, Entity, User } from "./Types";

const entityItem: Entity = {
    id: "item-001",
    location_id: "loc1",
    name: "Sword",
    description: "A sharp sword glinting in the light.",
    events: ["damage_player(10)"],
    event_triggers: ["swing", "attack"],
    probabilistic: false,
    attributes: { damage: 10 },
  };
  
  const entityNPC: Entity = {
    id: "npc-001",
    location_id: "loc1",
    name: "Guardian",
    description: "A stern guardian stands watch.",
    events: ["give_quest('find_key')", "attack_player(20)"],
    event_triggers: ["talk", "attack"],
    probabilistic: false,
    attributes: { hp: 100 },
  };

const location1: Location = {
    location_id: "loc1",
    game_id: "1",
    aliases: ["MainHall", "main hall"],
    description: "The main hall of the castle",
    exits: [], 
    entities: [entityItem, entityNPC],
  };
  
  const location2: Location = {
    location_id: "loc2",
    game_id: "1",
    aliases: ["Dungeon", "dungeon"],
    description: "A dark and eerie dungeon below the castle.",
    exits: [], 
    entities: [],
  };
  
  location1.exits.push(location2);
  location2.exits.push(location1);

const gameA: Game = {
    game_id: "1",
    name: "Oedk",
    user_id: "user1",
    playable: true,
    world: [location1, location2],
    user_save_states: {}, // will add a save state after creating user1
    player_beginning_stat: { hp: 100, strength: 10, agility: 5 },
  };
  
  const gameB: Game = {
    game_id: "2",
    name: "Forest",
    user_id: "user2",
    playable: true,
    world: [], // No locations defined for this game
    user_save_states: {},
    player_beginning_stat: {},
  };
  
  const gameC: Game = {
    game_id: "3",
    name: "ARice",
    user_id: "user3",
    playable: true,
    world: [],
    user_save_states: {},
    player_beginning_stat: {},
  };


const user1: User = {
  user_id: "user1",
  username: "sample-user",
  token: "token1",
  password: "password1",
  game_permissions: [gameA, gameC],
  game_sessions: [gameA],
  games_created: [gameA],
};

const user2: User = {
  user_id: "user2",
  username: "user-2",
  token: "token2",
  password: "password2",
  game_permissions: [gameA, gameB],
  game_sessions: [gameB],
  games_created: [gameB],
};

const user3: User = {
  user_id: "user3",
  username: "user-3",
  token: "token3",
  password: "password3",
  game_permissions: [gameA, gameB, gameC],
  game_sessions: [gameA, gameB, gameC],
  games_created: [],
};

const saveState1: SaveState = {
  game_id: "1",
  player: user1,
  inventory: [entityItem],
};

gameA.user_save_states[user1.user_id] = saveState1;

export class GameBackend {
  private users: User[];
  private games: Game[];

  constructor(users: User[], games: Game[]) {
    this.users = users;
    this.games = games;
  }

  get Users(): User[] {
    return this.users;
  }

  get Games(): Game[] {
    return this.games;
  }
}

export const StubDB = new GameBackend([user1, user2, user3], [gameA, gameB, gameC]);
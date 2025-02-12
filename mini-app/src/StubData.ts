// File containing mock backend data and a Database class and their getter methods
import { GameInfo, User } from "./Types";

// Game Information Data
const game1: GameInfo = {
    Name: "Oedk",
    Id: "1",
    Instruction: "Welcome to the OEDK",
    Deadline: Date.now(),
    Icon: "Image of Gear"
  };
  
  const game2: GameInfo = {
    Name: "Forest",
    Id: "2",
    Instruction: "You're in a dark forest",
    Deadline: Date.now(),
    Icon: "Image of Tree"
  };
  
  const game3: GameInfo = {
    Name: "Rice",
    Id: "3",
    Instruction: "Welcome to Rice",
    Deadline: Date.now(),
    Icon: "Image of Owl"
  };
  

// User Data
const user1: User = {
    name: "sample-user",
    id: "id1",
    assignments: ["Oedk", "Rice"],
    scores: { 'Oedk': 50, 'Rice': 0 },
    inventory: { 'Oedk': ["hammer", "computer"], 'Rice': [] }
};

const user2: User = {
    name: "user-2",
    id: "id2",
    assignments: ["Oedk", "Forest"],
    scores: { 'Forest': 5 },
    inventory: { 'Forest': ["water", "knife"], }
};

// Database Class
export class GameBackend {
    private users: User[]; // Users Database
    private games: GameInfo[]; // Game Info Database

    constructor(players: User[], games: GameInfo[]) {
        this.users = players;
        this.games = games;
    }

    // Getter method for Backend users
    get Users(): User[] {
        return this.users;
    }

    // Getter method for backend players
    get Games(): GameInfo[] {
        return this.games;
    }
}

export const StubDB = new GameBackend([user1, user2], [game1, game2, game3])
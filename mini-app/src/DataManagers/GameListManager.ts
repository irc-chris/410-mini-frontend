import { StubDB } from "../StubData";
import { GameInfo, User } from "../Types";

class GameListManager {
  
    static getGames(username: string): GameInfo[] {
        if (!StubDB.Users.find(user => user.name === username)) {
            throw new Error("User not found");
        }
        
        var userInfo: User = StubDB.Users.find(user => user.name === username)!;
        var games: GameInfo[] = StubDB.Games;
        var gamesByUser: GameInfo[] = games.filter(game => userInfo.assignments.includes(game.Name));
        return gamesByUser;
    }
    
    static getGamesSortedByDeadline(username: string): GameInfo[] {
        if (!StubDB.Users.find(user => user.name === username)) {
            throw new Error("User not found");
        }
        
        var userInfo: User = StubDB.Users.find(user => user.name === username)!;
        var games: GameInfo[] = StubDB.Games;
        var gamesByUser: GameInfo[] = games.filter(game => userInfo.assignments.includes(game.Name));
        gamesByUser.sort((a, b) => a.Deadline - b.Deadline);
        return gamesByUser;
    }

    static getGameSortedByScore(username: string): GameInfo[] {
        if (!StubDB.Users.find(user => user.name === username)) {
            throw new Error("User not found");
        }
        
        var userInfo: User = StubDB.Users.find(user => user.name === username)!;
        var games: GameInfo[] = StubDB.Games;
        var gamesByUser: GameInfo[] = games.filter(game => userInfo.assignments.includes(game.Name));
        gamesByUser.sort((a, b) => userInfo.scores[a.Name] - userInfo.scores[b.Name]);
        return gamesByUser;
    }
    return { getGames, getGamesSortedByDeadline, getGameSortedByScore};
}

export default GameListManager;
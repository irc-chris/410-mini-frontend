import { StubDB } from "../StubData";
import { GameInfo, User, GameLocation, Entity } from "../Types";

class GameListManager {
  
    static getGames(username: string, sortBy: "default" | "name" | "score" = "default"): GameInfo[] {
        const userInfo: User | undefined = StubDB.Users.find(user => user.user_id = username);
        if (!userInfo) {
            throw new Error("User not found");
        }
        
        let games: GameInfo[] = StubDB.Games;
        let gamesByUser: GameInfo[] = games.filter(game => 
            userInfo.game_permissions.includes(game.game_id) || userInfo.games_created.includes(game.game_id)
        );

        // Apply sorting based on sortBy
        switch (sortBy) {
            case "score":
                gamesByUser.sort((a, b) => {
                    const scoreA = a.user_save_states[userInfo.user_id]?.attributes?.score || 0;
                    const scoreB = b.user_save_states[userInfo.user_id]?.attributes?.score || 0;
                    return scoreB - scoreA;
                });
                break;
            case "name":
                gamesByUser.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "default":
            default:
                break;
        }

        // NEW FUNCTIONALITY: filter games that are either playable or created by user
        gamesByUser = gamesByUser.filter(game => game.playable || game.user_id === userInfo.user_id);
        return gamesByUser;
    }
}

export default GameListManager;
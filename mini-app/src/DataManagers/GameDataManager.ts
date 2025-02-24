import { StubDB } from "../StubData";
import { GameInfo, User } from "../Types";

function GameDataManager() {
    function getGameInfo(username: String, gameID: String): {user: User, game: GameInfo} {
        let user: User = StubDB.Users.find((user) => user.username === username)!;
        let game: GameInfo = StubDB.Games.find((game) => game.game_id === gameID)!;
        return {user, game}; 
    }
    return { getGameInfo };
}

export default GameDataManager;
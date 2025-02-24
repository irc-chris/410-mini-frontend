import { StubDB } from "../StubData";
import { Game, User } from "../Types";

function GameDataManager() {
    function getGame(username: String, gameID: String): {user: User, game: Game} {
        let user: User = StubDB.Users.find((user) => user.username === username)!;
        let game: Game = StubDB.Games.find((game) => game.game_id === gameID)!;
        return {user, game}; 
    }
    return { getGame };
}

export default GameDataManager;
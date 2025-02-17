import { StubDB } from "../StubData";
import { GameInfo, User } from "../Types";

function GameDataManager() {
    function getGameInfo(username: String, gameID: String): {user: User, game: GameInfo} {
        let user: User = StubDB.Users.find((user) => user.name === username)!;
        let game: GameInfo = StubDB.Games.find((game) => game.Id === gameID)!;
        return {user, game}; 
    }
}

export default GameDataManager;
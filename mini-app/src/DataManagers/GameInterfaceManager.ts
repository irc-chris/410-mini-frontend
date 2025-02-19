import { StubDB } from "../StubData";
import { GameInfo, User } from "../Types";

function GameInterfaceManager() {
    function getGameInfo(username: string, gameID: string): {user: User, game: GameInfo} {
        const user: User = StubDB.Users.find((user) => user.name === username)!;
        const game: GameInfo = StubDB.Games.find((game) => game.Id === gameID)!;
        return {user, game}; 
    }
    return { getGameInfo };
}

export default GameInterfaceManager;
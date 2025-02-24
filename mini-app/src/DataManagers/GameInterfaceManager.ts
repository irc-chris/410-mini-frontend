import { StubDB } from "../StubData";
import { Game, User } from "../Types";

function GameInterfaceManager() {
    function getGameInfo(username: string, name: string): {user: User, game: Game} {
        const user: User = StubDB.Users.find((user) => user.username === username)!;
        const game: Game = StubDB.Games.find((game) => game.name === name)!;
        return {user, game}; 
    }
    return { getGameInfo };
}

export default GameInterfaceManager;
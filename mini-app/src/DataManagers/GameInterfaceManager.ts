import { StubDB } from "../StubData";
import { Game, User } from "../Types";

function GameInterfaceManager() {
    function getGameInfo(username: string, name: string): {user: User, game: Game, invent: String[]} {
        const user: User = StubDB.Users.find((user) => user.username === username)!;
        const game: Game = StubDB.Games.find((game) => game.name === name)!;
        const invent: String[] = game.user_save_states[user.user_id].inventory.map((item, i) => (
            item.name))
        return {user, game, invent}; 
    }

    return { getGameInfo };
}

export default GameInterfaceManager;
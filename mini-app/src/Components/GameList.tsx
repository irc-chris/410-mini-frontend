import React from "react";
import Game from "./Game";

interface GameListProps {
    games: { name: string; icon?: string }[];
    onGameClick: (gameName: string) => void;
}

const GameList: React.FC<GameListProps> = ({games, onGameClick}) => {
    return (
        <div className="space-y-2">
            {games.map((game) => (
                <Game key={game.name} name={game.name} icon={game.icon} onClick={() => onGameClick(game.name)} />
            ))}
        </div>
    );
};

import React from "react";

interface GameProps {
    name: string;
    icon?: string;
    onClick?: () => void;
}

const Game: React.FC<GameProps> = ({name, icon, onClick}) => {
    return (
        <div className="flex items-center space-x-4 p-2 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100" onClick={onClick}>
            {icon && <img src={icon} alt={`${name} icon`} className="w-10 h-10 rounded-md" />}
            <span className="text-lg font-semibold">{name}</span>
        </div>
    );
};

export default Game;
"use client";
import React from "react";
import { users } from "../DataManagers/UserManager";
import GameListManager from "../DataManagers/GameListManager";

export function Leaderboard() {
    // Collect unique game names from user assignments
    const allGames = GameListManager.getAllGames();
  
    return (
      <div>
        <h1>Leaderboard</h1>
        {allGames.map((game) => (
          <div key={game.game_id}>
            <h2>{game.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users
                .map((user) => {
                  const saveState = game.user_save_states[user.user_id];
                  return {
                    user,
                    score: saveState?.attributes?.score ?? "No progress yet"
                  };
                })
                .sort((a, b) => (b.score === "No progress yet" ? 0 : b.score) - (a.score === "No progress yet" ? 0 : a.score))
                .map(({ user, score }, index) => (
                  <tr key={user.user_id}>
                    <td>{index+1}</td>
                    <td>{user.username}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      );
    }
  
  export default Leaderboard;

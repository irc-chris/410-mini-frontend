"use client";
import { User } from "../Types";
import { StubDB } from "../StubData";

class UserManager {
    private users: User[];

    constructor() {
        this.users = StubDB.Users;
    }

    // Fetch all users
    getAllUsers(): User[] {
        return this.users;
    }
}

// Instantiate UserManager
const userManager = new UserManager();

// Export users array
export const users: User[] = userManager.getAllUsers();

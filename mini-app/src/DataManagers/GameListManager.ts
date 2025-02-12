import { StubDB } from "../StubData";

// Just checking it's able to access database
export function hello() {
    console.log(StubDB.Games)
}
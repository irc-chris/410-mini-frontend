# 410-mini-frontend

authors:
xb5@rice.edu    - Sheena Bai
irc-chris       - Ishawnia Christopher
jacomjos        - Josue Jacome
Tarushi_M       - Tarushi Mittal
angel-romero-f  - Angel Romero
Jingwu-01       - Jingwu Wang

The file to edit the main displayed page is within Components. This produces a component that page.tsx imports and then displays as a React Component.

Manager Files: 
- in DataManagers
- will end up interacting with the backend
- To access the "Backend":
    * StubDB (defined in StubData) is an instance of a GameDatabase type defined in Types
    * import { StubDB } from "../StubData"
    * then do StubDB.Games or StubDB.Users

Component Files:
- are in Components
- should NEVER access StubData
- CAN access Manager files
- CAN access Types

To work on the project please:
1. Make a branch for ur component
2. Find the file corresponding the the task you selected.
3. Work in that file according to the specification.
4. Make a pull request when you think your code is good to merge (have a TL approve it)
5. Complete the merge


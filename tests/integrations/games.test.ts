import supertest from "supertest";
import app from "app";
import { cleanDb } from "../../helpers";
import { createConsoleAndGame, createGame, findGame, consoleId4000 } from "../factories/consoles-factory";
import httpStatus from "http-status";

const api = supertest(app);

beforeEach(async () => {
    await cleanDb();
  });

describe("GET /games", () => {
    it("should respond with games list", async () => {
        const games = await createConsoleAndGame();     

        const response = await api.get("/games");

        expect(response.body).toEqual(expect.arrayContaining ([{
            id: games.games[0].id,
            title: games.games[0].title
        }]));

    //     expect(response.body).toEqual([{   
    //         consoleId: games.games[0].consoleId,
    //         id: games.games[0].id,
    //         title: games.games[0].title,
    //     },
    //      {
    //         id: games.id,
    //         name: games.name,
    //     }
    //   ]
            // {
            //     id: games.id,
            //     name: games.name,
            //     games: [{
            //         id: games.games[0].id,
            //         consoleId: games.games[0].consoleId,
            //         title: games.games[0].title
            //     }]                
       // )
    });

    it("should respond with [] if there is no game", async () => {
        const response = await api.get("/games");

        expect(response.body).toEqual([]);
    });
});

describe("GET /games/:id", () => {
    it("should respond with a specific game", async () => {
        const game = await createConsoleAndGame();

        const response = await api.get(`/games/${game.games[0].id}`);

        expect(response.body).toEqual({
            id: game.games[0].id,
            consoleId: game.games[0].consoleId,
            title: game.games[0].title
        });            
    });

    it("should respond with status 404 if game doesn't exist", async () => {
        const response = await api.get("/games/00");

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
});

describe("POST /games", () => {
    it("should respond with status 201", async () => {
        await cleanDb();
        //const game = await createConsoleAndGame();
        await consoleId4000()
        const response = await api.post("/games").send({consoleId:4000, title: "boi" }) ;

        //const find = await findGame(game.games[0].id)
        // expect(find).toEqual({
        //     id: find.id,
        //     title: find.title,
        //     consoleId: find.consoleId
        // })
        expect(response.status).toEqual(httpStatus.CREATED);            
    });

    it("should respond with status 409 if game already exists", async () => {
        await consoleId4000()
        //await createConsoleAndGame()
        //const game = await createGame(faker.name.firstName(), 1);
        await api.post("/games").send({title: "batata", consoleId: 4000});
        const response = await api.post("/games").send({title: "batata", consoleId: 4000});

        expect(response.status).toEqual(httpStatus.CONFLICT);
    });
});
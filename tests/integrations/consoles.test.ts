import supertest from "supertest";
import app from "app";
import { cleanDb } from "../../helpers";
import { createConsoleAndGame, postConsole, findFirst } from "../factories/consoles-factory";
import httpStatus from "http-status";

const api = supertest(app);

beforeEach(async () => {
    await cleanDb();
  });

describe("GET /consoles", () => {
    it("should respond with status 200 and all consoles", async () => {
        const postConsole = await createConsoleAndGame();
        const response = await api.get("/consoles");

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.arrayContaining ([{
            id: postConsole.id,
            name: postConsole.name
        }]));
    })
})

describe("GET /consoles/:id", () => {
    it("should respond with status 200 and specific console", async () => {
        const postConsole = await createConsoleAndGame();
        const response = await api.get(`/consoles/${postConsole.id}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
            id: postConsole.id,
            name: postConsole.name
        });
    });

    it("should respond with status 404 when specific console not exist", async () => {
        const postConsole = await createConsoleAndGame();
        const response = await api.get("/consoles/-1");

        expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
})

describe("POST /consoles", () => {
    it("should respond with status 201 when console is created", async () => {
        const response = await api.post("/consoles").send({name: "fulusteco"});
        // const find = await findFirst(1);

        //expect(find.name).toEqual(response.body.name)
        expect(response.status).toBe(httpStatus.CREATED);
    })

    it("should respond with status 409 when console is exist", async () => {
        const post = await api.post("/consoles").send({name: "fulusteco"});
        const response = await api.post("/consoles").send({name: "fulusteco"})

        expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 422 when body is not valid", async () => {
        const response = await api.post("/consoles").send({nome: "fulusteco"})

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
})





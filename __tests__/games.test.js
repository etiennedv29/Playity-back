// mock avant import
jest.mock("../repository/games", () => {
  const originalModule = jest.requireActual("../repository/games");
  return {
    ...originalModule,
    getGames: jest.fn(() => [
      { id: 1, name: "Mock Game 1" },
      { id: 2, name: "Mock Game 2" },
    ]),
  };
});

// maintenant on importe le module et app
const request = require("supertest");
const app = require("../app");
const gamesService = require("../repository/games");

describe("Test /games endpoint", () => {
  it("should return mocked games", async () => {
    const response = await request(app).get("/games");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Mock Game 1" },
      { id: 2, name: "Mock Game 2" },
    ]);
    expect(gamesService.getGames).toHaveBeenCalled();
  });
});

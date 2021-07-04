/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");

const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
    it("return a array", () =>
      agent.get("/pokemons").then((res) => {
        expect(Array.isArray(res.body)).to.be.true;
      }));
    it("return data for pokeapi", () =>
      agent.get("/pokemons").then((res) => {
        expect(res.body[0].neme).to.be.equal("bulbasaur")
        expect(res.body[1].img.includes("rk/2.png")).to.be.true
        expect(res.body[2].img.includes("rk/3.png")).to.be.true
        expect(res.body[2].types[1]).to.be.equal("poison")
      }));
  });
});

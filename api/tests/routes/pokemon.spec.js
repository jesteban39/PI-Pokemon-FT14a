/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");

const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);

describe("Pokemon routes", () => {
  const pokemon = {
    name: "Pikachu",
  };
  const pokemon1 = {
    id: 1,
    neme: "bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
  };
  const pokemon162 = {
    id: 162,
    neme: "furret",
    life: 85,
    force: 76,
    defense: 64,
    speed: 90,
    height: 18,
    weight: 325,
    types: ["normal"],
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/162.png",
  };
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
    it("respond for a array", () =>
      agent.get("/pokemons").then((res) => {
        expect(Array.isArray(res.body)).to.be.true;
      }));
    it("respond for first pokemon to pokeapi", () =>
      agent.get("/pokemons").then((res) => {
        expect(res.body[0]).to.be.deep.equal(pokemon1);
      }));
    it("respond any pokemons", () =>
      agent.get("/pokemons").then((res) => {
        expect(res.body.length).to.be.equal(12);
      }));
    it("respond for data to pokeapi", () =>
      agent.get("/pokemons").then((res) => {
        expect(res.body[0].neme).to.be.equal("bulbasaur");
        expect(res.body[1].img.includes("rk/2.png")).to.be.true;
        expect(res.body[2].img.includes("rk/3.png")).to.be.true;
        expect(res.body[2].types[1]).to.be.equal("poison");
      }));
  });
  describe("GET /pokemons/:id", () => {
    it("should get 404 if id is not number", () =>
      agent.get("/pokemons/id").expect(404));
    it("should get 201 and a {} if is not pokemon for this id", () =>
      agent
        .get("/pokemons/0")
        .expect(201)
        .then((res) => {
          expect(res.body).to.be.deep.equal({});
        }));
    it("should get 200", () => agent.get("/pokemons/1").expect(200));
    it("respond for a pokemon of pokeapi", () =>
      agent.get("/pokemons/162").then((res) => {
        expect(res.body).to.be.deep.equal(pokemon162);
      }));
  });
});

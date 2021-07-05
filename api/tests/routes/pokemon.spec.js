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
    name: "bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
  };
  const pokemon25 = {
    id: 25,
    name: "pikachu",
    life: 35,
    force: 55,
    defense: 40,
    speed: 90,
    height: 4,
    weight: 60,
    types: ["electric"],
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
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
        expect(res.body[0].name).to.be.equal("bulbasaur");
        expect(res.body[1].img.includes("rk/2.png")).to.be.true;
        expect(res.body[2].img.includes("rk/3.png")).to.be.true;
        expect(res.body[2].types[1]).to.be.equal("poison");
      }));
  });
  describe("GET /pokemons/:id", () => {
    it("should get 200", () => agent.get("/pokemons/1").expect(200));
    it("should get 404 if id is not number", () =>
      agent.get("/pokemons/id").expect(404));
    it("should get 404 and a {message:} if is not pokemon for this id", () =>
      agent
        .get("/pokemons/0")
        .expect(404)
        .then((res) => {
          expect(res.body.massage).to.be.contain.string;
        }));
    it("respond for a pokemon of pokeapi", () =>
      agent.get("/pokemons/25").then((res) => {
        expect(res.body).to.be.deep.equal(pokemon25);
      }));
  });

  describe("GET /pokemons?name=", () => {
    it("should get 200", () =>
      agent.get("/pokemons?name=pikachu").expect(200));
    it("should get 404 and a {message:} if is not pokemon for this name", () =>
      agent
        .get("/pokemons?name=picachu")
        .expect(404)
        .then((res) => {
          expect(res.body.massage).to.be.contain.string;
        }));
    it("respond for a pokemon of pokeapi", () =>
      agent.get("/pokemons?name=pikachu").then((res) => {
        expect(res.body).to.be.deep.equal(pokemon25);
      }));
  });
  describe("POST /pokemons", () => {
    it("should get 404 and a {message:} if name is not a string valid", () => {
      agent
        .post("/pokemons")
        .send({
          id: "hola",
          name: "243**++",
        })
        .expect(404)
        .then((res) => {
          expect(res.body.massage).to.be.contain.string;
        });
    });
    it("should get 200 and a message of confirmation ", () =>
      agent
        .post("/pokemons")
        .send({
          name: "mi  +{{}+} poke",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.massage).to.be.contain.string;
        }));
  });
});

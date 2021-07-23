const { Pokemon,  conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    afterEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      xit("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(Error("It requires a valid name")))
          .catch(() => done());
      });

      xit("should work when its two valid name", (done) => {
        Pokemon.create({ name: "pokea" })
          .then(() => Pokemon.create({ name: "pokeb" }))
          .then(() => done())
          .catch(() => done(Error("must be saved")));
      });
      xit("should throw an error if the name already exists", (done) => {
        Pokemon.create({ name: "pokea" })
          .then(() => Pokemon.create({ name: "pokea" }))
          .then(() => done(Error()))
          .catch(() => done());
      });
      xit("add a different id for each pokemon", () => {
        Promise.all([
          Pokemon.create({ name: "pokec" }),
          Pokemon.create({ name: "poked" }),
        ]).then((pokemons) => {
          expect(pokemons[0].id).to.not.equal(pokemons[1].id);
        });
      });
      xit("add hyphens instead of spaces", () => {
        Pokemon.create({ name: "poke dek" }).then((pokemon) => {
          expect(pokemon.name).to.be.equal("poke-dek");
        });
      });
    });
    describe("other columns", () => {
      xit("add a default image", () => {
        Pokemon.create({ name: "poke img" }).then((pokemon) => {
          expect(pokemon.img).to.not.null();
        });
      });
      xit("add life column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.life).to.not.null();
        });
      });
      xit("add force column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.force).to.not.null();
        });
      });
      xit("add defense column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.defense).to.not.null();
        });
      });
      xit("add speed column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.speed).to.not.null();
        });
      });
      xit("add height column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.height).to.not.null();
        });
      });
      xit("add column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.height).to.not.null();
        });
      });
      xit("add weight column", () => {
        Pokemon.create({ name: "poke" }).then((pokemon) => {
          expect(pokemon.weight).to.not.null();
        });
      });
    });
  });
});

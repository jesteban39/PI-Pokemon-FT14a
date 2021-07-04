const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", (done) => {
        Pokemon.create({ name: "test_1" })
          .then(() => done())
          .catch(() => done(new Error("se devio guardar ")));        
      });
      it("should work when its a valid name", (done) => {
        Pokemon.create({ name: "test_2" })
          .then(()=> Pokemon.create({ name: "test_3" }))
          .then(() => done())
          .catch(() => done(new Error("se devio guardar ")));
      });
    });
  });
});

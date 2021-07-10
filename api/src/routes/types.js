const { Router } = require("express");
const { Grade } = require("../db.js");
const router = Router();

router.get("/", (req, res) => {
  return Grade.findAll({ attributes: ["name"] })
    .then((types) => {
      return res.json({
        mesages: "successful search",
        count: types.length,
        data: types.map((type) =>type.name)
      })})
    .catch((err) => {
      console.error(err);
      return res.status(404).json({ message: "no types found" });
    });
});

module.exports = router;

const { Router } = require("express");
const { Grade } = require("../db.js");
const router = Router();

router.get("/", (req, res) => {
  return Grade.findAll({ attributes: ["id", "name"] })
    .then((types) => res.json(types))
    .catch((err) =>
      res.status(404).json({ message: "no types found" })
    );
});

module.exports = router;

const express = require("express");
const { getDogs } = require("../controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allDogs = await getDogs();
    const { name } = req.query;
    if (name) {
      const dogs = allDogs.filter((e) =>
        e.name.toLowercase().includes(name.toLowercase())
      );
      dogs.length
        ? res.status(200).send(dogs)
        : res.status(400).json({ message: "Dog not found" });
    } else {
      res.status(200).send(allDogs);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Ocurrió algo inesperado" });
  }
});

module.exports = router;

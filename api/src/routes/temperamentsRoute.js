const express = require("express");
const { getTemperaments } = require("../controller");

const router = express.Router();

//Obtengo todos los temperamentos de mi base de datos
router.get("/", async (req, res) => {
  try {
    const temperaments = await getTemperaments();
    if (temperaments.length) {
      return res.status(200).send(temperaments);
    } else {
      return res.status(400).json({ message: "No temperaments found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
});

module.exports = router;

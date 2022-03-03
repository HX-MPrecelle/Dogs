const { response } = require("express");
const express = require("express");
const { getDogs } = require("../controller");
const { Dog, Temperament } = require("../db");

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
    return res.status(500).json({ message: "Something unexpected happened" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const dog = await Dog.findOne({
        where: {
          id,
        },
      });
      return res.status(200).send(dog);
    } else {
      return res.status(401).json({ message: "Dog id needed" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      weight_min,
      weight_max,
      height_min,
      height_max,
      bred_for,
      breed_group,
      life_span_min,
      life_span_max,
      temperament,
      image,
    } = req.body;

    const exists = await Dog.findOne({ where: { name } });

    const allTemperaments = await Temperament.findAll();
    const allTemperamentsFilter = allTemperaments.map((e) => e.dataValues.name);

    if (
      name &&
      weight_min &&
      weight_max &&
      height_min &&
      height_max &&
      bred_for &&
      breed_group &&
      life_span_min &&
      life_span_max &&
      temperament &&
      image
    ) {
      if (!exists) {
        if (temperament.length <= 7) {
          const copyTemperament = [];
          for (const t of temperament) {
            const parcial = allTemperamentsFilter.find((e) => e === t);
            if (parcial) {
              copyTemperament.push(parcial);
            }
          }
          if (temperament.length === copyTemperament.length) {
            const dog = await Dog.create({
              name,
              weight_min,
              weight_max,
              height_min,
              height_max,
              bred_for,
              breed_group,
              life_span_min,
              life_span_max,
              temperament,
              image,
            });
            return res.status(201).send(dog);
          } else {
            return res
              .status(401)
              .json({ message: "Temperament is not valid" });
          }
        } else {
          return res
            .status(401)
            .json({ message: "Maximun of seven temperaments" });
        }
      } else {
        return res.status(401).json({ message: "Dog name already exist" });
      }
    } else {
      return res.status(401).json({ message: "Complete all fields" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something unexpected happened" });
  }
});

module.exports = router;

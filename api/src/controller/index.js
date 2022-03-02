const axios = require("axios");
const e = require("express");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

//Traigo todos las razas desde la API y los guardo en la base de datos (ésta función se ejecuta cuando se inicializa el servidor)
const getApiDogs = async () => {
  try {
    const url = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;
    const allData = await axios.get(url);
    const allDogs = allData.data;
    const dogs = await allDogs?.map((e) => {
      return {
        name: e.name,
        weight_min: e.weight?.metric.split("-")[0],
        weight_max: e.weight?.metric.split("-")[1],
        height_min: e.height?.metric.split("-")[0],
        height_max: e.height?.metric.split("-")[1],
        bred_for: e.bred_for ? e.bred_for : "Unknown",
        breed_group: e.breed_group ? e.breed_group : "Unknown",
        life_span_min: e.life_span.split("-").map(e => e.trim() && e.trim().slice(0, 2))[0],
        life_span_max: e.life_span.split("-").map(e => e.trim() && e.trim().slice(0, 2))[1],
        temperament: e.temperament ? e.temperament.split(",") : ["Unknown"],
        image: e.image?.url,
      };
    });
    dogs?.forEach((d) => {
      Dog.findOrCreate({
        where: {
          name: d.name,
        },
        defaults: {
          weight_min: d.weight_min !== undefined ? d.weight_min.trim() : d.weight_max.trim(),
          weight_max: d.weight_max !== undefined ? d.weight_max.trim() : d.weight_min.trim(),
          height_min: d.height_min !== undefined ? d.height_min.trim() : d.height_max.trim(),
          height_max: d.height_max !== undefined ? d.height_max.trim() : d.height_min.trim(),
          bred_for: d.bred_for,
          breed_group: d.breed_group,
          life_span_min: d.life_span_min ? d.life_span_min.trim() : d.life_span_max.trim(),
          life_span_max: d.life_span_max ? d.life_span_max.trim() : d.life_span_min.trim(),
          temperament: d.temperament.map((e) => e),
          image: d.image,
        },
      });
    });
    // console.log(dogs);
    return dogs;
  } catch (e) {
    return console.log(e);
  }
};

const getApiTemperaments = async () => {
  try {
    const url = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;
    const allData = await axios.get(url);
    const allTemperaments = allData.data?.map((e) => e.temperament?.split(","));
    const copyTemperaments = [];
    // console.log(allTemperaments);
    for (const temperament of allTemperaments) {
      temperament?.forEach((t) => copyTemperaments.push(t.trim()));
      // console.log(temperament);
    }
    const temperaments = [...new Set(copyTemperaments)];
    //   console.log(temperaments);
    temperaments?.forEach((t) => {
      Temperament.findOrCreate({
        where: {
          name: t,
        },
      });
    });
    // console.log(temperaments);
    return temperaments;
  } catch (e) {
    return console.log(e);
  }
};

const getDogs = async () => {
  try {
    const allDogs = await Dog.findAll();
    const dogs = [];
    for (const d of allDogs) {
      dogs.push(d.dataValues)
    }
    // console.log(dogs);
    return dogs;
  } catch (e) {
    return console.log(e);
  }
};

const getTemperaments = async () => {
  try {
    const allTemperaments = await Temperament.findAll();
    const temperaments = [];
    for (const t of allTemperaments) {
      temperaments.push(t.dataValues)
    }
    // console.log(temperaments);
    return temperaments;
  } catch (e) {
    return console.log(e);
  }
};

module.exports = {
  getApiDogs,
  getApiTemperaments,
  getDogs,
  getTemperaments
};

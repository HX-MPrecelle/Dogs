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
        weight: e.weight?.metric,
        height: e.height?.metric,
        bred_for: e.bred_for ? e.bred_for : "Unknown",
        breed_group: e.breed_group ? e.breed_group : "Unknown",
        life_span: e.life_span,
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
          weight: d.weight,
          height: d.height,
          bred_for: d.bred_for,
          breed_group: d.breed_group,
          life_span: d.life_span,
          temperament: d.temperament.map((e) => e),
          image: d.image,
        },
      });
    });
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

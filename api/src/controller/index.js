const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

//Traigo todos las razas desde la API y los guardo en la base de datos (ésta función se ejecuta cuando se inicializa el servidor)
const getApiDogs = async () => {
  const url = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;
  const allData = await axios.get(url);
  const dogs = allData.data?.map((e) => {
    return {
      name: e.name,
      weight: e.weight?.metric,
      height: e.height?.metric,
      bred_for: e.bred_for ? e.bred_for : "Unknown",
      breed_group: e.breed_group ? e.breed_group : "Unknown",
      life_span: e.life_span,
      temperaments: e.temperament ? e.temperament.split(",") : "Unknown",
      image: e.image?.url,
    };
  });
  // console.log(dogs);
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
        temperaments: d.temperaments,
        image: d.image,
      },
    });
  });
  return dogs;
};

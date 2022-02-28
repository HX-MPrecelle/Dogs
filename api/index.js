const { getApiDogs, getApiTemperaments } = require('./src/controller');
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 8080;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await Promise.all([getApiDogs(), getApiTemperaments()]);
    console.log(`%s listening at ${PORT}`);
  });
});

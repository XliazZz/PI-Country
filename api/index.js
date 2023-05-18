const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { getCountriesApi } = require ('./src/controllers/Countries/saveApiData.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await getCountriesApi();
  console.log('DB connected')
  server.listen(3001, () => {
    console.log('Server listening at 3001'); // eslint-disable-line no-console
  });
}).catch((error) => {
  console.log(error);
});

//Quitar el {force: true} para que los datos se queden guardados. 'conn.sync()'
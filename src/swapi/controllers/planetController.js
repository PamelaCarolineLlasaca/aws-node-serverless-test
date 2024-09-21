const { planets, planetById } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

const getPlanets = async (event) => {
  try {
    const { page = 1, name = '' } = event.queryStringParameters || {};

    const planetData = await planets(page, name);
    const translatedData = translateFields(planetData.results, 'planets');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Los planetas se han obtenido correctamente.',
        data: translatedData,
      }),
    };
  } catch (error) {
    console.error('Error al obtener planetas:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Hubo un error al obtener los planetas.',
        error: error.message,
      }),
    };
  }
};

const getPlanetById = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'El id del planeta es requerido.',
        }),
      };
    }

    const planet = await planetById(id);
    const translatedData = translateFields(planet, 'planets');

    if (!planet) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Planeta con ID ${id} no encontrado.`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Planeta encontrado.',
        data: translatedData,
      }),
    };
  } catch (error) {
    console.error(`Error al obtener el planeta con Id ${event.pathParameters.id}:`, error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Hubo un error al obtener el planeta.',
        error: error.message,
      }),
    };
  }
};

module.exports={
    getPlanets,
    getPlanetById
}
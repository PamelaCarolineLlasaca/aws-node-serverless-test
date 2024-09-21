const { people } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

const getPeople = async (event) => {
  try {
    const { page = 1, name = '' } = event.queryStringParameters || {};

    const peopleData = await people(page, name);
    const translatedData = translateFields(peopleData.results, 'people');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Las personas se han obtenido correctamente.',
        data: translatedData,
      }),
    };

  } catch (error) {
    console.error('Error al obtener personas:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Hubo un error al obtener las personas.',
        error: error.message,
      }),
    };
  }
};

module.exports={
    getPeople
}

const { vehicles, vehicleById } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

const getVehicles = async (event) => {
  try {
    const { page = 1, name = '' } = event.queryStringParameters || {};

    const vehicleData = await vehicles(page, name);
    const translatedData = translateFields(vehicleData.results, 'vehicles');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Vehículos obtenidos correctamente.',
        data: translatedData,
      }),
    };
  } catch (error) {
    console.error('Error al obtener vehículos:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Hubo un error al obtener los vehículos.',
        error: error.message,
      }),
    };
  }
};

const getVehicleById = async (event) => {
    try {
      const { id } = event.pathParameters;
  
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'El id del vehiculo es requerido..',
          }),
        };
      }
  
      const vehicle = await vehicleById(id);
      const translatedData = translateFields(vehicle, 'vehicles');

      if (!vehicle) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `Vehículo con ID ${id} no encontrado.`
          }),
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Vehículo encontrado.',
          data: translatedData,
        }),
      };
    } catch (error) {
      console.error(`Error al obtener el vehículo con ID ${event.pathParameters.id}:`, error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Hubo un error al obtener el vehículo.',
          error: error.message,
        }),
      };
    }
  };

  module.exports={
    getVehicles,
    getVehicleById
  }
const { getVehicles, getVehicleById } = require('../controllers/vehicleController');
const { vehicles, vehicleById } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

jest.mock('../services/swapiService');
jest.mock('../utils/translation');

describe('getVehicles', () => {
  it('debería devolver una lista de vehículos correctamente', async () => {

    vehicles.mockResolvedValueOnce({ results: [{ name: 'AT-AT' }, { name: 'Speeder' }] });
    
    translateFields.mockReturnValueOnce([{ nombre: 'AT-AT' }, { nombre: 'Speeder' }]);

    const event = { queryStringParameters: { page: 1 } };
    const result = await getVehicles(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).data).toEqual([{ nombre: 'AT-AT' }, { nombre: 'Speeder' }]);
  });

  it('debería manejar errores al obtener vehículos', async () => {

    vehicles.mockRejectedValueOnce(new Error('Error al obtener vehículos'));

    const event = { queryStringParameters: { page: 1 } };
    const result = await getVehicles(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe('Hubo un error al obtener los vehículos.');
  });
});

describe('getVehicleById', () => {
  it('debería devolver un vehículo correctamente por ID', async () => {
    vehicleById.mockResolvedValueOnce({ name: 'AT-AT' });
    translateFields.mockReturnValueOnce({ nombre: 'AT-AT' });

    const event = { pathParameters: { id: '1' } };
    const result = await getVehicleById(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).data).toEqual({ nombre: 'AT-AT' });
  });

  it('debería manejar un ID no encontrado', async () => {
    vehicleById.mockResolvedValueOnce(null);

    const event = { pathParameters: { id: '99' } };
    const result = await getVehicleById(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toBe('Vehículo con ID 99 no encontrado.');
  });

  it('debería manejar errores al obtener vehículo por ID', async () => {
    vehicleById.mockRejectedValueOnce(new Error('Error al obtener el vehículo'));

    const event = { pathParameters: { id: '1' } };
    const result = await getVehicleById(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe('Hubo un error al obtener el vehículo.');
  });
});

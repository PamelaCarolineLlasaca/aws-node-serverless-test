const { getPlanets, getPlanetById } = require('../controllers/planetController');
const { planets, planetById } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

jest.mock('../services/swapiService');
jest.mock('../utils/translation');

describe('getPlanets', () => {
    it('debería devolver una lista de planetas correctamente', async () => {
      planets.mockResolvedValueOnce({ results: [{ name: 'Tatooine' }, { name: 'Alderaan' }] });
      
      translateFields.mockReturnValueOnce([{ nombre: 'Tatooine' }, { nombre: 'Alderaan' }]);
  
      const event = { queryStringParameters: { page: 1 } };
      const result = await getPlanets(event);
  
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body).data).toEqual([{ nombre: 'Tatooine' }, { nombre: 'Alderaan' }]);
    });
  
    it('debería manejar errores al obtener planetas', async () => {

      planets.mockRejectedValueOnce(new Error('Error al obtener planetas'));
  
      const event = { queryStringParameters: { page: 1 } };
      const result = await getPlanets(event);
  
      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).message).toBe('Hubo un error al obtener los planetas.');
    });
  });
  
  describe('getPlanetById', () => {
    it('debería devolver un planeta correctamente por ID', async () => {
      planetById.mockResolvedValueOnce({ name: 'Tatooine' });
      translateFields.mockReturnValueOnce({ nombre: 'Tatooine' });
  
      const event = { pathParameters: { id: '1' } };
      const result = await getPlanetById(event);
  
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body).data).toEqual({ nombre: 'Tatooine' });
    });
  
    it('debería manejar un ID no encontrado', async () => {
      planetById.mockResolvedValueOnce(null);
  
      const event = { pathParameters: { id: '99' } };
      const result = await getPlanetById(event);
  
      expect(result.statusCode).toBe(400);
      expect(JSON.parse(result.body).message).toBe('Planeta con ID 99 no encontrado.');
    });
  
    it('debería manejar errores al obtener planeta por ID', async () => {
      planetById.mockRejectedValueOnce(new Error('Error al obtener el planeta'));
  
      const event = { pathParameters: { id: '1' } };
      const result = await getPlanetById(event);
  
      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).message).toBe('Hubo un error al obtener el planeta.');
    });
  });
  
const { getPeople } = require('../controllers/peopleController');
const { people } = require('../services/swapiService');
const { translateFields } = require('../utils/translation');

jest.mock('../services/swapiService');
jest.mock('../utils/translation');

describe('getPeople', () => {
    it('debería devolver una lista de personas correctamente', async () => {

      people.mockResolvedValueOnce({ results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }] });
      
      translateFields.mockReturnValueOnce([{ nombre: 'Luke Skywalker' }, { nombre: 'Darth Vader' }]);
  
      const event = { queryStringParameters: { page: 1 } };
      const result = await getPeople(event);
  
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body).data).toEqual([{ nombre: 'Luke Skywalker' }, { nombre: 'Darth Vader' }]);
    });
  
    it('debería manejar errores al obtener personas', async () => {
 
      people.mockRejectedValueOnce(new Error('Error al obtener personas'));
  
      const event = { queryStringParameters: { page: 1 } };
      const result = await getPeople(event);
  
      expect(result.statusCode).toBe(500);
      expect(JSON.parse(result.body).message).toBe('Hubo un error al obtener las personas.');
    });
  });
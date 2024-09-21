const axios = require('axios');

const SWAPI_BASE_URL = 'https://swapi.dev/api';

async function people(page = 1, name = '') {
  let url = `${SWAPI_BASE_URL}/people/?page=${page}`;
  if (name) {
    url = `${SWAPI_BASE_URL}/people/?search=${name}`;
  }
  const response = await axios.get(url);
  return response.data;
}

async function vehicles(page = 1, name = '') {
    let url = `${SWAPI_BASE_URL}/vehicles/?page=${page}`;
    if (name) {
      url = `${SWAPI_BASE_URL}/vehicles/?search=${name}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
  
  async function vehicleById(id) {
    const url = `${SWAPI_BASE_URL}/vehicles/${id}/`;
    const response = await axios.get(url);
    return response.data;
  }

  async function planets(page = 1, name = '') {
    let url = `${SWAPI_BASE_URL}/planets/?page=${page}`;
    if (name) {
      url = `${SWAPI_BASE_URL}/planets/?search=${name}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
  
  async function planetById(id) {
    const url = `${SWAPI_BASE_URL}/planets/${id}/`;
    const response = await axios.get(url);
    return response.data;
  }

module.exports = { 
    people,
    vehicles,
    vehicleById,
    planets,
    planetById
};
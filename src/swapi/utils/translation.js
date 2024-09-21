const fieldTranslations = {
    vehicles: {
      name: 'nombre',
      model: 'modelo',
      vehicle_class: 'clase_de_vehículo',
      manufacturer: 'fabricante',
      length: 'longitud',
      cost_in_credits: 'costo_en_créditos',
      crew: 'tripulación',
      passengers: 'pasajeros',
      max_atmosphering_speed: 'velocidad_máxima',
      cargo_capacity: 'capacidad_de_carga',
      consumables: 'consumibles',
      films: 'películas',
      pilots: 'pilotos',
      url: 'url',
      created: 'creado',
      edited: 'editado',
    },
    planets: {
      name: 'nombre',
      diameter: 'diámetro',
      rotation_period: 'período_de_rotación',
      orbital_period: 'período_orbital',
      gravity: 'gravedad',
      population: 'población',
      climate: 'clima',
      terrain: 'terreno',
      surface_water: 'agua_superficial',
      residents: 'residentes',
      films: 'películas',
      url: 'url',
      created: 'creado',
      edited: 'editado',
    },
    people: {
      name: 'nombre',
      height: 'altura',
      mass: 'masa',
      hair_color: 'color_de_cabello',
      skin_color: 'color_de_piel',
      eye_color: 'color_de_ojos',
      birth_year: 'año_de_nacimiento',
      gender: 'género',
      homeworld: 'planeta_natal',
      films: 'películas',
      species: 'especies',
      vehicles: 'vehículos',
      starships: 'naves_estelares',
      url: 'url',
      created: 'creado',
      edited: 'editado',
    },
  };
  
  const translateFields = (data, resource) => {
    if (Array.isArray(data)) {
      return data.map(item => translateFields(item, resource));
    }
  
    const translatedItem = {};
    for (const key in data) {
      if (fieldTranslations[resource][key]) {
        translatedItem[fieldTranslations[resource][key]] = data[key];
      }
    }
    return translatedItem;
  };

  module.exports = { translateFields };
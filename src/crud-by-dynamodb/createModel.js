const AWS=require('aws-sdk');

const { v4: uuidv4 } = require('uuid');

const createModel = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let name, description, type;

  ({ name, description, type } = JSON.parse(event.body));
  if (!name || !description || !type) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Name, description y type, son requeridos.",
      }),
    };
  }

  const createdAt = new Date().toISOString();
  const id = uuidv4();
  const newModel = {
    id,
    name,
    description,
    type,
    createdAt,
  };

  try {
    await dynamodb.put({
      TableName: 'Model',
      Item: newModel,
    }).promise();

    return {
      statusCode: 201, 
      body: JSON.stringify({
        message: "Model creado correctamente.",
        model: newModel,
      }),
    };
  } catch (error) {

    console.error("Error al crear model: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error en el servidor, no se pudo crear model.",
        error: error.message,
      }),
    };
  }
};


module.exports={
    createModel
}
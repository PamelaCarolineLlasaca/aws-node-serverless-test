const AWS = require("aws-sdk");

const getModel = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "El id es requerido.",
      }),
    };
  }

  try {

    const result = await dynamodb
      .get({
        TableName: "Model",
        Key: { id },
      })
      .promise();

    const model = result.Item;
    if (!model) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Model con '${id}' no se encontró..`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Model encontrado.",
        model,
      }),
    };
  } catch (error) {

    console.error("Error al encontrar model: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error en el servidor, no se pudo encontrar el model.",
        error: error.message,
      }),
    };
  }
};


module.exports = {
    getModel,
};
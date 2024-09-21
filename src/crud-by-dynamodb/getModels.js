
const AWS=require('aws-sdk');

const getModels = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {

    const result = await dynamodb.scan({ TableName: "Model" }).promise();

    const models = result.Items || [];

    return {
      statusCode: 200,
      body: JSON.stringify({
        models,
      }),
    };
  } catch (error) {

    console.error("Error al obtener Models: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error en el servidor, no se pudo obtener los Models.",
        error: error.message,
      }),
    };
  }
};


module.exports={
    getModels
}
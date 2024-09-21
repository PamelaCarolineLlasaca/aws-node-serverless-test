const AWS = require("aws-sdk");

const updateModel = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const { id } = event.pathParameters;

    const { name, description } = JSON.parse(event.body);
  
    if (!id || !name || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Id, name y description son requeridos.",
        }),
      };
    }
  
    try {

      const model = await dynamodb
        .update({
          TableName: "Model",
          Key: { id },
          UpdateExpression: "set #n = :name, description = :description",
          ExpressionAttributeValues: {
            ":name": name,
            ":description": description,
          },
          ExpressionAttributeNames: {
            "#n": "name",
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Model actualizado correctamente.",
          model,
        }),
      };
    } catch (error) {

      console.error("Error al actualizar model: ", error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error en el servidor, no se pudo actuaizar el model.",
          error: error.message,
        }),
      };
    }
  };
  

module.exports = {
    updateModel,
};
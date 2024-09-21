const AWS=require('aws-sdk');

const deleteModel = async (event) => {

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
      await dynamodb
        .delete({
          TableName: "Model",
          Key: { id },
        })
        .promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Model eliminado correctamente.",
        }),
      };
    } catch (error) {
      console.error("Error al eliminar model: ", error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error en el servidor, no se pudo eliminar el model.",
          error: error.message,
        }),
      };
    }
  };
  
  
  module.exports={
    deleteModel
  }
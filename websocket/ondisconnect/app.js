const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.handler = async event => {
  const deleteParams = {
    TableName: process.env.TABLE_NAME,
    Key: {
      connectionId: event.requestContext.connectionId
    }
  };

  return ddb.delete(deleteParams)
            .promise()
            .then(() => ({ statusCode: 200, body: 'Deleted Connection' }))
            .catch(e => ({ statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(e) }));
};
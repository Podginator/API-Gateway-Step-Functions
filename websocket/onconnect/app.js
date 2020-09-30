const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.handler = async event => {
  const ttl = Math.floor((new Date()).getTime() / 1000) + 3600;
  const { clientId } = event.queryStringParameters;
  const putParams = {
    TableName: process.env.TABLE_NAME,
    Item: {
      connectionId: event.requestContext.connectionId,
      ttl,
      clientId  
    }
  };

  return ddb.put(putParams)
            .promise()
            .then(() => ({ statusCode: 200, body: 'Connected' }))
            .catch(e => ({ statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(e) }));
};
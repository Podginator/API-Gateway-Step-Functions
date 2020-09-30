const AWS = require('aws-sdk');
const axios = require('axios');
const { aws4Interceptor } = require("aws4-axios")

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

const getConnectionId = (clientId) => ddb.query({ 
  TableName: process.env.TABLE_NAME, 
  IndexName: 'clientIdIdx', 
  KeyConditionExpression: 'clientId = :clientId',
  ExpressionAttributeValues: {
    ':clientId': clientId
  }
}).promise()


const interceptor = aws4Interceptor({
  region: "us-east-1",
  service: "execute-api"
});
 
axios.interceptors.request.use(interceptor);

exports.handler = async (event, context, callback) => {
  const { error, clientId } = event
  const connectionId = await getConnectionId(clientId);
  if (!connectionId.Items.length > 0) { 
    throw Error('Connection Id Not Found');
  }
  await axios.post(`${process.env.WEBSOCKET_URI}${connectionId.Items[0].connectionId}`, { error } )
};
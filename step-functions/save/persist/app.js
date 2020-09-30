const AWS = require('aws-sdk');
const axios = require('axios');
const { aws4Interceptor } = require("aws4-axios")

const interceptor = aws4Interceptor({
  region: "us-east-1",
  service: "execute-api"
});
 
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

axios.interceptors.request.use(interceptor);

const getConnectionId = (clientId) => ddb.query({ 
  TableName: process.env.TABLE_NAME, 
  IndexName: 'clientIdIdx', 
  KeyConditionExpression: 'clientId = :clientId',
  ExpressionAttributeValues: {
    ':clientId': clientId
  }
}).promise()

exports.handler = async (event, context, callback) => {
  const { url, clientId } = event
  const connectionId = await getConnectionId(clientId);
  if (!connectionId.Items.length > 0) { 
    throw Error('Connection Id Not Found');
  }
  await axios.post(`${process.env.WEBSOCKET_URI}${connectionId.Items[0].connectionId}`, { url } )
  
};
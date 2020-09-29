const AWS = require('aws-sdk');
const axios = require('axios');
const { aws4Interceptor } = require("aws4-axios")

const interceptor = aws4Interceptor({
  region: "us-east-1",
  service: "execute-api"
});
 
axios.interceptors.request.use(interceptor);

exports.handler = async (event, context, callback) => {
  const { text, clientId } = event
  await axios.post(`${process.env.WEBSOCKET_URI}${clientId}`, { text } )
};
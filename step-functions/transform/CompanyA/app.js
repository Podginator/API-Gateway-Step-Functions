const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  callback({...event, text: "Hello From A"});

};
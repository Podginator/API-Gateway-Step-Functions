exports.handler = async (event, context, callback) => {
  callback(null, {...event, text: "Lambda A-2"});
};
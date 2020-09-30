exports.handler = async (event, context, callback) => {
  callback(null, {...event, text: "From Lambda B"});
};
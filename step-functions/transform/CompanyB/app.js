exports.handler = async (event, context, callback) => {
  callback({...event, text: "From Lambda B"});
};
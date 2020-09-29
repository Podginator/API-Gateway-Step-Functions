// Fake some sleep for effect 
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

exports.handler = async (event, context, callback) => {
  // So there's likely a lot more to it than this, but we should for now work on some assumptions. 
  await sleep(250)
  callback({...event, text: "Lambda A"});
};
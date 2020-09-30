// Fake some sleep for effect (In reality this might be a slow running API or something)
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

exports.handler = async (event, context, callback) => {
  await sleep(1250)
  callback(null, {...event, text: "Lambda A"});
};
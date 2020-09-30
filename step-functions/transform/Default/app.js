class UnableToProcessEventError { 
  constructor(message) { 
    this.message = message;
  }
}

exports.handler = async (event, context, callback) => {
  const random = Math.floor((Math.random() * 10) + 1);

  if (random <= 3) { 
    throw new UnableToProcessEventError("RandomNumberError")
  }
  
  callback(null, {...event, text: "From Default"});
};
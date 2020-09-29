class UnableToProcessEventError { 
  constructor(message) { 
    this.message = message;
  }
}

exports.handler = async (event, context, callback) => {
  const random = Math.floor((Math.random() * 10) + 1);

  if (random <= 3) { 
    // Throw an error here. 
    throw new UnableToProcessEventError("RandomNumberError")
  }
  
  callback({...event, text: "From Lambda B"});
};
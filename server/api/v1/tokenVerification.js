const jwt = require("jsonwebtoken");

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }
    return authResponse;
  }
  

module.exports.handler =(event, context, callback) =>{
    // console.log(req);
    const token = event.handler('Auth-Token');
    const secret_key = 'ueoirhdsmnfsdgfygstnbgweroeroirthdjfgmcxvsiehjsdfh'

    if(!token) return callback(null, 'Unauthorized');
        // verifies secret and checks exp
    jwt.verify(token, secret_key, (err, decoded) => {
        if (err)
        return callback(null, 'Unauthorized');

        // if everything is good, save to request for use in other routes
        return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
    });
    
}

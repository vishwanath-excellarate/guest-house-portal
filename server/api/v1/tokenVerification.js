const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

// Policy helper function
// const generatePolicy = (principalId, effect, resource) => {
//     const authResponse = {};
//     authResponse.principalId = principalId;
//     if (effect && resource) {
//       const policyDocument = {};
//       policyDocument.Version = '2012-10-17';
//       policyDocument.Statement = [];
//       const statementOne = {};
//       statementOne.Action = 'execute-api:Invoke';
//       statementOne.Effect = effect;
//       statementOne.Resource = resource;
//       policyDocument.Statement[0] = statementOne;
//       authResponse.policyDocument = policyDocument;
//     }
//     return authResponse;
//   }
  

// module.exports.handler =(event, err, result) =>{
//   console.log("=====");
//    console.log(event.headers['Auth-Token']);
//     const token = event.headers['Auth-Token'];
//     const secret_key = 'ueoirhdsmnfsdgfygstnbgweroeroirthdjfgmcxvsiehjsdfh'

//     if(!token) return result.status(200).json(result);
//         // verifies secret and checks exp
//     jwt.verify(token, secret_key, (err, decoded) => {
//         if (err)
//         return callback(null, 'Unauthorized');

//         // if everything is good, save to request for use in other routes
//         return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
//     });
    
// }
module.exports.handler = async (event, context) => {
  const authorizerToken = event.authorizationToken
  const authorizerArr = authorizerToken.split(' ')
  const token = authorizerArr[1]

  if (authorizerArr.length !== 2 ||
  authorizerArr[0] !== 'Bearer' ||
  authorizerArr[1].length === 0) {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }
  let decodedJwt = jwt.verify(token, process.env.JWT_SECRET)
  if (typeof decodedJwt.username !== 'undefined' &&
  decodedJwt.username.length > 0) {
    return generatePolicy(decodedJwt.username, 'Allow', event.methodArn)
  }
  generatePolicy('undefined', 'Deny', event.methodArn)

}

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource) {
  let authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    let policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    let statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}
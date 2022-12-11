const util = require("./utils");
const { connectDB } = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = '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';

const tranEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'muzammilexcellarate@gmail.com',
    name: 'Anjan',
}
const receivers = [
  {
      email: 'muzammildafedaar@gmail.com',
  },
]



module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  try {
    const secret_key = 'ueoirhdsmnfsdgfygstnbgweroeroirthdjfgmcxvsiehjsdfh'
    const body = JSON.parse(event.body);
    const ReqHead = event.headers; 
    // console.log(ReqHead);
    if(ReqHead['authorization'] === undefined || ReqHead['authorization'] === null){
      return  {
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({ message: "Unknown request" }),
      };

    } else {
      const Etoken = ReqHead['authorization'].split(" ") 
     const res = jwt.verify(Etoken[1], secret_key, async (err, decoded) => {
                if (err) {

                  console.log("Encountered an error:", err);
                  return {
                    statusCode: err.statusCode ? err.statusCode : 500,
                   headers: util.getResponseHeaders(),
                    body: JSON.stringify({
                      error: err.name ? err.name : "Exception",
                      message: err.message ? err.message : "Unknown error",
                    }),
                  };
                } else {
                  console.log(decoded);

                  console.log('checking jwt');
                  const response = await connectDB().then(async (connection) => {
                    return new Promise((resolve, reject) => {
                      var sql = `INSERT INTO exc_users (email,role) VALUES ('${body.email}', 'employee')`;
                      connection.query(sql, function (err, result) {
                        if (err) return reject(err);
                        var res = {
                          statusCode: 200,
                         headers: util.getResponseHeaders(ReqHead['authorization']),
                          body: JSON.stringify({ message: "successfully created" }),
                        };
                      
                        tranEmailApi
                        .sendTransacEmail({
                            sender,
                            to: receivers,
                            subject: 'Subscribe to Cules Coding to become a developer',
                            textContent: `
                            Cules Coding will teach you how to become {{params.role}} a developer.
                            `,
                            htmlContent: `
                            <h1>Cules Coding</h1>
                            <a href="https://cules-coding.vercel.app/">Visit</a>
                                    `,
                            params: {
                                role: 'Frontend',
                            },
                        })
                        .then(console.log)
                        .catch(console.log)
    
                            resolve(res);

                      });
                      connection.release();
                    });
                  });
                  return response;

                }
        
                // if everything is good, save to request for use in other routes
                //return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
        
      });
      return res;

    }
  
    
  } catch (err) {
    console.log("Encountered an error:", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
     headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  } 
};

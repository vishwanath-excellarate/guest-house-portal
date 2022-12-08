const util = require("./utils");
const { connectDB } = require("../config/db");
const jwt = require('jsonwebtoken');

const secret_key = 'ueoirhdsmnfsdgfygstnbgweroeroirthdjfgmcxvsiehjsdfh'


module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const response = await connectDB().then(async (connection) => {
      return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM exc_users WHERE email='${body.email}'AND password='${body.password}'`;
        connection.query(sql, function (err, result) {
          if (err) return reject(err);
          if(!result.length){
            var res = {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify({ message: "Invalid email/ password" , queryResult: result}),
              };
              resolve(res);

          } else {
            const token = jwt.sign({id: result[0].name, password:result[0].password}, secret_key)


            var res = {
                statusCode: 200,
                headers: util.getResponseHeaders(token),
                body: JSON.stringify({ message: "successfully verified" , queryResult: result[0].name}),
              };
            //   res.headers('auth-token', token, );

              resolve(res);
          }
          
        });
        connection.release();
      });
    });
    return response;
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

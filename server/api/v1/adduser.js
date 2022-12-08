const util = require("./utils");
const { connectDB } = require("../config/db");
const verifyToken = require('./tokenVerification');
module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  try {
    const body = JSON.parse(event.body);
    const response = await connectDB().then(async (connection) => {
      return new Promise((resolve, reject) => {
        var sql = `INSERT INTO exc_users (email) VALUES ('${body.email}')`;
        connection.query(sql, function (err, result) {
          if (err) return reject(err);
          var res = {
            statusCode: 200,
           headers: util.getResponseHeaders(),
            body: JSON.stringify({ message: "successfully created" }),
          };
          resolve(res);
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

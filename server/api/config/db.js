var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "guest_house"
  });

exports.connectDB = () => {
  return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
          if (err) {
              return reject(err);
          }
          resolve(connection);
      });
  });
};

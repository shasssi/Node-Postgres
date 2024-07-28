const fs = require("fs");
const pg = require("pg");

const config = {
  user: "",
  password: "",
  port: 14121,
  database: "",
  host: "",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  // client.query("SELECT VERSION()", [], function (err, result) {
  //   if (err) throw err;
  //   console.log(result.rows[0]);
  //   client.end(function (err) {
  //     if (err) throw err;
  //   });
  // });
  // client.query("SELECT * FROM USER", [], function (err, result) {
  //   if (err) throw err;
  //   console.log(result.rows[0]);
  //   client.end(function (err) {
  //     if (err) throw err;
  //   });
  // });
});

module.exports.query = (text, values) => {
  console.log("query:", text, values);
  return client.query(text, values);
};

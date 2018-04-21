// ROBOR 3T-ben így lehet új user-t létrehozni
// use TESTDB

// db.createUser(
//     {
//         user:"USERTEST",
//         pwd: "USERPASSWORD",
//         roles: [
//             {role: "readWrite", db: "DBNAME"}
//         ]
//         }
//         )

const host = 'localhost';
const port = 27017;
const user = 'USERTEST2';
const password = 'USERPASSWORD';
const database = 'testDB';
//const algorithm =

const uri = `mongodb://${user}:${password}@${host}:${port}/${database}`;

const options = {
    connectTimeoutMS: 2000,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
  }

module.exports = {
  uri: uri,
  options: options
}

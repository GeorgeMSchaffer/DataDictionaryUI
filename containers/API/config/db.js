require('dotenv').config();
const db = {
  user: process.env.DATA_DICTIONARY_SQL_DB_USER,
  password: process.env.DATA_DICTIONARY_SQL_DB_PASSWORD,
  server: process.env.DATA_DICTIONARY_SQL_SERVER,
  database: process.env.DATA_DICTIONARY_SQL_DB_SERVER_DB,
};
console.debug('DB Server and Database',db.server,db.database)
module.exports = db;


require('dotenv').config();
const db = {
  user: process.env.APOS_SQL_DB_USER,
  password: process.env.APOS_SQL_DB_PASSWORD,
  server: process.env.APOS_SQL_DB_SERVER,
  database: process.env.APOS_SQL_SERVER_DB,
};
console.debug('DB Server and Database',db.server,db.database)
module.exports = db;
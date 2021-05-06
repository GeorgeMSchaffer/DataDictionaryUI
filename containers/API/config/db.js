require('dotenv').config();
const db = {
  data_dictionary_user: process.env.DATA_DICTIONARY_SQL_DB_USER,
  data_dictionary_password: process.env.DATA_DICTIONARY_SQL_DB_PASSWORD,
  data_dictionary_server: process.env.DATA_DICTIONARY_SQL_SERVER,
  data_dictionary_database: process.env.DATA_DICTIONARY_SQL_DB_SERVER_DB,
  apos_db_user: process.env.DATA_DICTIONARY_SQL_DB_USER,
  apos_db_password: process.env.DATA_DICTIONARY_SQL_DB_PASSWORD,
  apos_db_server: process.env.DATA_DICTIONARY_SQL_SERVER,
  apos_db_database: process.env.DATA_DICTIONARY_SQL_DB_SERVER_DB,

};
console.log('DB CONFIG',db);
module.exports = db;


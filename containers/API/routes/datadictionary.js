var express = require('express');
var router = express.Router();
var sql = require('mssql');

const  defaultLimit = 25

//[TODO] refactor back to db.js in way we can switch active config (APOS vs DataDictionary SQL servers) on a per request basis
const db = {
  user: process.env.DATA_DICTIONARY_SQL_DB_USER,
  password: process.env.DATA_DICTIONARY_SQL_DB_PASSWORD,
  server: process.env.DATA_DICTIONARY_SQL_SERVER,
  database: process.env.DATA_DICTIONARY_SQL_DB_SERVER_DB,
};
console.dir(db);
var sql = require('mssql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api users ok.');
});

router.get('/test/', function(req, res, next) {
	res.send('api users ok.');
  });
  
module.exports = router;

const _Query = async function(sqlStatment,inputs=[]){
	let error= null;
	const data = [];
	try{
		//const conn = await new sql.Connection(db)
		await sql.connect(db);

		const results = await sql.query(sqlStatment,inputs);
		console.error('results',results.recordset[0]);
		data.push(results.recordset[0]);

	}
	catch(err){
		console.error('Query Failed',err);
		error = err;
	}
	finally {
	//	sql.disconnect();
		console.log('DATA', data.length);
		await sql.close();
		const rtn = {
			success: (!error) ? true: false,
			error: (error && error.message) ? error.message : null,
			data: (data.length) ? data : []
		}
		console.log('QUERY RETURN',rtn);
		return rtn;
	}
};

router.get('/instances/failed/', async function (req, res, next) {
	const limit =
	req.query.params && req.query.params.limit
	  ? req.query.params.limit
	  : defaultLimit;

  //	sql
	const sqlStatment = `SELECT COUNT(1) from information_schema.tables`;
  const results = await Query(db,sqlStatment);
  console.log("RESULTS", results);
  res.json(results);
});

router.get("/applications/", async function (req, res, next) {
	const limit = (req.query.params && req.query.params.limit) ? req.query.params.limit : defaultLimit;
		const sqlStatment = `
			SELECT TOP (${limit}) 
				[Id]
				,[RowSts]
				,[AppNam]
				,[Domain]
				,[GrpPfx]
				,[AppTyp]
				,[LngNam]
				,[AppDsc]
			FROM [secApplications]`
		const results = await _Query(sqlStatment)
		console.log('RESULTS',results);
		res.json(results)
	});


router.get("/databases/", async function (req, res, next) {
	const limit =
    req.query.params && req.query.params.limit
      ? req.query.params.limit
      : defaultLimit;

	//	sql
		const sqlStatment = `
		SELECT TOP (${limit}) 
			[Id]
			,[RowSts]
			,[AppNam]
			,[SrvNam]
			,[DbNam]
			,[AppTyp]
		FROM [secDatabases]`;
		const results = await _Query(sqlStatment)
		console.log('RESULTS',results);
		res.json(results)
});

router.get("/sqlusers/", async function (req, res, next) {
	const limit =
    req.query.params && req.query.params.limit
      ? req.query.params.limit
      : defaultLimit;

  //	sql
	const sqlStatment = `
	SELECT TOP (${limit})
			[SrvNam]
      ,[DbNam]
      ,[UsrNam]
      ,[PrnId]
      ,[UsrSid]
      ,[TypCod]
      ,[TypDsc]
      ,[Access]
      ,[DftSch]
      ,[UsrCrt]
      ,[UsrChg]
      ,[Refreshed]
  FROM [DataDictionary].[dbo].[SqlUsers]`;
  const results = await _Query(sqlStatment);
  console.log("RESULTS", results);
  res.json(results);
});

var express = require('express');
var router = express.Router();
let limit = 25

//[TODO] refactor back to db.js in way we can switch active config (APOS vs DataDictionary SQL servers) on a per request basis
const db = {
    user: `DD_USER`,
    password: `OpenSesame`,
    server: `SPDDDB`,
    database: process.env.SQL_SERVER_DB,
  };

var sql = require('mssql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api users ok.');
});

router.get('/test/', function(req, res, next) {
	res.send('api users ok.');
  });
  
module.exports = router;

router.get("/applications/", function (req, res, next) {
	console.log('DB CONFIG',db)
	sql.connect(db, function (err) {
		if (err) console.log(err);

		var request = new sql.Request();
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
		request.query(
			sqlStatment,
			function (err, result) {
				if (err) {
					console.error(err);
					res.send(err);
				}
				// var rowsCount = result.rowsAffected;
				sql.close();
				res.json(result);
			}
		); // request.query
	}); // sql.conn
});


router.get("/databases/", function (req, res, next) {
	console.log('DB CONFIG',db)
	sql.connect(db, function (err) {
		if (err) console.error(err);

		var request = new sql.Request();
		const sqlStatment = `
		SELECT TOP (${limit}) 
			,[Id]
			,[RowSts]
			,[AppNam]
			,[SrvNam]
			,[DbNam]
			,[AppTyp]
		FROM [secDatabases]`
		request.query(
			sqlStatment,
			function (err, result) {
				if (err) {
					console.error(err);
					res.send(err);
				}
				// var rowsCount = result.rowsAffected;
				sql.close();
				res.json(result);
			}
		); // request.query
	}); // sql.conn
});
var express = require('express');
var router = express.Router();
const defaultLimit = 25;
require('dotenv').config();

//const Query = require('../Query');
var sql = require('mssql');
const db = {
	user: "APOS_USER",
	password: "qgdUoi3fiQ91FCQklR3i",
	server: "SDAPOSDB",
	database: "APOSInsight"
  };
const _Query = async function(db,sqlStatment,inputs=[]){
	let error= null;
	const data = [];
	console.debug('RECEIVED DB',db);
	if (!db) throw "Unable to complete query! A database config object was not passed. ABORTING"
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
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({'ok':true});
}); // get /


router.get("/scan/status/:scan_date/", function (req, res, next) {
	sql.connect(db, function (err) {
		if (err) console.log(err);

		var request = new sql.Request();
		request.input("scan_date", sql.NVarChar, req.params.scan_date);
		request.query(
			`SELECT 
					AP_Info_Date,System_Name,AP_Status,AP_Object_Type,AP_Objects_Scanned 
					FROM AP_Objects_Status
				WHERE ap_info_date = @scan_date
				ORDER BY 1 DESC`,
			function (err, result) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				// var rowsCount = result.rowsAffected;
				sql.close();
				//res.json(result);
				
				res.render("index", {
					route: "index",
					data: result.recordset[0],
				});
				
			}
		); // request.query
	}); // sql.conn
});


	router.get('/instances/failed/', async function (req, res, next) {
		const limit =
		req.query.params && req.query.params.limit
		  ? req.query.params.limit
		  : defaultLimit;
	
	  //	sql
		const sqlStatment = `SELECT 
		TOP ${limit}
			[SI_ID]
			,[System_Name]
			,[SI_NAME]
			,[SI_SCHEDULE_STATUS]
			,[SI_STARTTIME]
			,[SI_ENDTIME]
			,[SI_UPDATE_TS]
			,[SI_ERROR_MESSAGE]
			,[SI_SUBMITTER]
			,[SI_PROGID]
			,[AP_Location]
			,[AP_Parameters]
			,[AP_Destination]
			,[AP_Alert]
			,[AP_Database]
			,[SI_NOTIFICATION]
			,[SI_FILEPATH]
			,[SI_CREATION_TIME]
			,[AP_FileSize]
			,[SI_SCHED_NOW]
			,[SI_RECURRING]
			,[SI_Schedule_Type]
	FROM [dbo].[AP_FinishedInstances]
	WHERE SI_ERROR_MESSAGE <> ''
	ORDER BY SI_UPDATE_TS DESC
	`;
	  const results = await _Query(db,sqlStatment);
	  console.log("RESULTS", results);
	  res.json(results);
	});

	router.get('/instances/props/:si_id/', async function (req, res, next) {
		const limit =
		req.query.params && req.query.params.limit
		  ? req.query.params.limit
		  : defaultLimit;
	
		const inputs = {name:"si_id",type:sql.Int,value:req.params.sid}
	  //	sql
		const sqlStatment = `
		select 
			si_instance_props
		from AP_InstanceProps p
		Inner join AP_Objects o on (
			o.SI_ID = p.SI_ID 
			AND o.System_Name = p.System_Name
		)
		WHERE O.SI_ID = @si_id
		`;
	  const results = await _Query(db,sqlStatment,inputs);
	  console.debug('RECEIVED RESULTS',results)
	  const xml = results.data[0].si_instance_props;
	  var parseString = require('xml2js').parseString;
	  parseString(xml,function(err,json){
			console.debug('RESULT WAS',json);
			console.log("RESULTS", results);
			res.json(json);	  
		})
	});

	router.get("/view/", async function (req, res, next) {
		const limit = (req.query.params && req.query.params.limit) ? req.query.params.limit : defaultLimit;
			const sqlStatment = `SELECT 'TEST`;
			const results = await _Query(db,sqlStatment)
			console.log('RESULTS',results);
			res.json(results)
		});
	
/* GET Edit page. */
router.get('/view/:SI_ID/', function (req, res, next) {

	sql.connect(db, function (err) {
		if (err)
			console.log(err);

		var request = new sql.Request();
		request.input('SI_ID', sql.Int, req.params.SI_ID)
		request.query("SELECT * FROM AP_Objects WHERE SI_ID = @SI_ID ORDER BY 1 DESC",
			function (err, result) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				// var rowsCount = result.rowsAffected;
				sql.close();
				res.json(result);
				/*
				res.render("edit", {
					route: "edit",
					data: result.recordset[0],
				});
				*/
			}
		); // request.query
	}); // sql.conn
});


/* GET Edit page. */
router.get('/scans/status/type/:ap_object_type', function (req, res, next) {

	sql.connect(db, function (err) {
		if (err){
			console.error(err);
            res.json({error:err});
            return;
        }
		var request = new sql.Request();
		try {
			request.input("ap_object_type", sql.NText, req.params.ap_object_type);
			request.query(
				"SELECT AP_Info_Date,System_Name,AP_Status,AP_Object_Type,AP_Objects_Scanned FROM AP_Objects_Status WHERE AP_Object_Type = @ap_object_type ORDER BY 1 DESC",
				function (err, result) {
					if (err) {
						console.error(err);
						res.send(err);
					}
					// var rowsCount = result.rowsAffected;
					sql.close();
					console.debug("SENDING RESULT", result.recordset);
					res.json(result);
					
					/*
					res.render("status", {
            route: "status",
            data: result.recordset,
          });
					*/
					
				}
			); // request.query
		}
		catch (err) {
			console.error('FATAL ERROR', err);
			res.send(err);
		}
		}); // sql.conn
	
});

/* GET Edit page. */
router.get('/scan/:type/', function (req, res, next) {

	sql.connect(db, function (err) {
		if (err)
			console.log(err);

		var request = new sql.Request();
		request.input('type', sql.NText, req.params.type);
		request.query(
			"SELECT AP_Info_Date,System_Name,AP_Status,AP_Object_Type,AP_Objects_Scanned FROM AP_Objects_Status WHERE AP_Object_Type = @type ORDER BY 1 DESC",
			function (err, result) {
				if (err) {
					console.log(err);
					res.send(err);
				}
				// var rowsCount = result.rowsAffected;
				sql.close();
				res.json(result);
				/*
				res.render("edit", {
					route: "edit",
					data: result.recordset[0],
				});
				*/
			}
		); // request.query
	}); // sql.conn
});


/* POST Edit page. */
// router.post('/update', function (req, res, next) {

// 	sql.connect(db, function (err) {
// 		if (err)
// 			console.log(err);

// 		var request = new sql.Request();
// 		request.input('id', sql.Int, req.body.id)
// 			.input('username', sql.NVarChar(50), req.body.username)
// 			.input('pwd', sql.NVarChar(50), req.body.pwd)
// 			.input('email', sql.NVarChar(50), req.body.email)
// 			.query('update UserList set username=@username,pwd=@pwd,email=@email where id=@id', function (err, result) {

// 				if (err) {
// 					console.log(err);
// 					res.send(err);
// 				}
// 				sql.close();
// 				res.redirect('/');
// 			});
// 	});
// });

module.exports = router;
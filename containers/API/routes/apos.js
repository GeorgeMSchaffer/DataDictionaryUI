var express = require('express');
var router = express.Router();
const defaultLimit = 25;
require('dotenv').config();
const traverse = require('json-schema-traverse');



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
	let data =[];
	console.debug('RECEIVED DB',db);
	console.debug('EXECUTING SQL STATMENT',sqlStatment);
	if (!db) throw "Unable to complete query! A database config object was not passed. ABORTING";
	try{
		//const conn = await new sql.Connection(db)
		await sql.connect(db);

		const results = await sql.query(sqlStatment,inputs);
		data = results.recordset;
	}
	catch(err){
		console.error('Query Failed',err);
		error = err;
	}
	finally {
	//	sql.disconnect();
		console.log('DATA', data);
		await sql.close();
		const rtn = {
			success: (!error) ? true: false,
			error: (error && error.message) ? error.message : null,
			data: (data.length) ? data : []
		}
		console.log('_QUERY RETURNING', rtn.success, rtn.error, rtn.data.length);
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
		console.debug('INSTANCE LIMIT IS',limit);
	  //	sql
		const sqlStatment = ` 
		SELECT TOP 25
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
	  	  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!! RESULTS:\r\n ", results.length);
	  res.json(results);
	});

	router.get('/instances/:si_id/', async function (req, res, next) {
		const { si_id } = req.params;

		const inputs = { name: "si_id", type: sql.Int, value: si_id }
	  //	sql
		const sqlStatment = `
		select 
			si_instance_props
		from AP_InstanceProps p
		Inner join AP_Objects o on (
			o.SI_ID = p.SI_ID 
			AND o.System_Name = p.System_Name
		)
		WHERE O.SI_ID = ${si_id}
		`;
	  const rtn = await _Query(db,sqlStatment,inputs);
		const xml = rtn.data[0].si_instance_props;
		
		var parser = require('fast-xml-parser');
		var he = require('he');
		
		const options = {
			attributeNamePrefix : "@_",
			attrNodeName: "attr", //default is 'false'
			textNodeName : "#text",
			ignoreAttributes : true,
			ignoreNameSpace : true,
			allowBooleanAttributes : true,
			parseNodeValue : true,
			parseAttributeValue : false,
			trimValues: true,
			cdataTagName: "__cdata", //default is 'false'
			cdataPositionChar: "\\c",
			parseTrueNumberOnly: false,
			arrayMode: false, //"strict"
			tagValueProcessor : a => he.decode(a),
			attrValueProcessor: (val, attrName) => {
				console.log('ATTR VALUE PROCESSER - NAME', attrName, 'VAL', val);
			},//default is a=>a
			tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
			stopNodes: ["parse-me-as-string"]
		};

		var json = parser.parse(xml, options);
		rtn.data = json.Root.Object;
		console.log('---------- RETURNING RTN ----------', rtn);
		res.json(rtn);
	  /*
		var parser = require('xml2JSON');
		parseString(xml, {
			normalize: true,
			normalizeTags: true,
			mergeAttrs: true,
			parseNumbers: true,
			parseBooleans: true,
			valueProcessors: [function (value, name) {
				console.log('VALUE:', value, 'NAME', name, 'IS ARRAY', Array.isArray(value));
				return value;
			}]
		}, function (err, json) {
			if (err) {
				console.error('ERROR PARSING JSON', err);
				res.json({});
			}
			traverse(json, { allKeys: true }, (args) => {
				console.log('TRAVERSE CALLED!',args)
			});
			res.json(json.root.object);
		},)
		*/

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
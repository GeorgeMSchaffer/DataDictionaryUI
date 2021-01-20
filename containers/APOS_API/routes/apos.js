var express = require('express');
var router = express.Router();

var db = require('../config/db');
var sql = require('mssql');

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
var sql = require('mssql');

const Query = async function(db,sqlStatment,inputs=[]){
    if(!db){
        return {
			success: false,
			error: "You have attempted to run a query with out a DB configuration Object, ABORTING!",
			data: []
		}
    }
	let error= null;
	const data = [];
	try{d
		await new sql.Connection(db)
		console.log('QUERY CONNECTING TO DB',db);
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
module.exports = Query;
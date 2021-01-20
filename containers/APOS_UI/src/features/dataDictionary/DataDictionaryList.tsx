import React, { useEffect, useState } from 'react';
import { RootState } from 'app/rootReducer';
import { useSelector,useDispatch } from 'react-redux';
import { Paper } from "@material-ui/core";
import { getDataDictionaryApplications } from './dataDictionarySlice';
import { useLocation,useHistory} from 'react-router-dom';
import MUIDataTable, {
	ExpandButton,
	MUIDataTableColumn,
	MUIDataTableOptions,
	MUIDataTableProps,
} from "mui-datatables";
import queryString from 'query-string';

interface IProps {
		//data: (any)[];
	};
	interface IState { };

	const TableOptions: MUIDataTableOptions = {
		jumpToPage: true,
		fixedHeader: true,
		fixedSelectColumn: false,
		sortOrder: { name: "amount", direction: "asc" },
		filterType: "checkbox",
		responsive: "standard",
		selectableRows: "none",
		elevation: 0,
		rowsPerPageOptions: [5, 10, 20, 25, 50, 100],
		downloadOptions: {
			filename: "filename.csv",
			separator: ",",
		},
		draggableColumns: {
			enabled: true,
		}
	};
const columns: MUIDataTableColumn[] = [
			{
				name: "AP_Info_Date",
				label: "APOS Scan Date",
			},
			{
				name: "System_Name",
				label: "Enviroment",
			},
			{
				name: "AP_Status",
				label: "Status",
			},
			{
				name: "AP_Object_Type",
				label: "Object Type",
			},
			{
				name: "AP_Objects_Scanned",
				label: "Objects Scanned",
			},
			{
				name: "AP_ScanDate",
				label: "Scan Date",
			},
			{
				name: "AP_Pulse",
				label: "Last Scan Pulse",
			},
			{
				name: "AP_LastScannedId",
				label: "Last Scanned Object ID",
			},
			{
				name: "AP_Config",
				label: "Configutation XML",
			},
];

export default function DataDictionaryApplicationsList(props:IProps) {
	const dispatch = useDispatch();
	console.log('SCAN LIST PROPS', props);

 const applications = useSelector(
   (state: RootState) => {
     console.log('USE SELECT RootState', state);
     return state.dataDicitionaryApplications
   });

  useEffect(() => {
		console.debug('DISPATCHING FETCH', 'current', applications);
		const type = 'webi';
		//[TODO] REFACTOR so the table has the same value
		dispatch(getDataDictionaryApplications(25));
	//	console.log(location);
        // Output: '?id=1&type=Pizza'
        // Output: '#id=1&type=Pizza'
//    dispatch(fetchUserById())
  },[applications,dispatch])
 
  return (
    <Paper>
			{JSON.stringify(applications)}
    </Paper>
  );
}



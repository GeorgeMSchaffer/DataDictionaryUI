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
//import queryString from 'query-string';

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
				name: "AppDsc",
				label: "APOS Scan Date",
			},
			{
				name: "AppNam",
				label: "Enviroment",
			},
			{
				name: "AppTyp",
				label: "Status",
			},
			{
				name: "Domain",
				label: "Object Type",
			},
			{
				name: "GrpPfx",
				label: "Objects Scanned",
			},
			{
				name: "Id",
				label: "Scan Date",
			},
			{
				name: "lngNam",
				label: "Last Scan Pulse",
			},
			{
				name: "RowSts",
				label: "Last Scanned Object ID",
			}
];

export default function DataDictionaryApplicationsList(props:IProps) {
	const dispatch = useDispatch();
	console.log('SCAN LIST PROPS', props);

 const applications = useSelector(
   (state: RootState) => {
     console.log('USE SELECT RootState', state);
     return state.dataDicitionaryApplications.applications
   });

  useEffect(() => {
		console.debug('DISPATCHING FETCH', 'current', applications);
		//const type = 'webi';
		
		//[TODO] REFACTOR so the table has the same value
		dispatch(getDataDictionaryApplications({
			limit: 25,
			type: 'applications'
		}));
	//	console.log(location);
        // Output: '?id=1&type=Pizza'
        // Output: '#id=1&type=Pizza'
//    dispatch(fetchUserById())
  },[applications,dispatch])
 
  return (
    <Paper>
			<MUIDataTable
				title={"TEST"}
				data={applications}
				columns={columns}
				options={TableOptions}
			/>

    </Paper>
  );
}



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
				name: "SrvNam",
				label: "Server Name",
			},
			{
				name: "TypCod",
				label: "Type Code",
			},
			{
				name: "TypDesc",
				label: "Type Description",
			},
			{
				name: "Access",
				label: "Access",
			},
			{
				name: "DftSch",
				label: "Default Schema",
			},
			{
				name: "UsrCrt",
				label: 'User Created Date',
			},
			{
				name: "UsrChg",
				label: "User Last Update Date",
			},
			{
				name: "Refreshed",
				label: "User Refreshed Date",
			}
];

export default function DataDictionarySqlUsersList(props:IProps) {
	const dispatch = useDispatch();
	console.log('SCAN LIST PROPS', props);

 const data = useSelector(
   (state: RootState) => {
     console.log('USE SELECT RootState', state);
     //return state.dataDicitionaryApplications.sqlusers;
     return [];
   });

  useEffect(() => {
		//const type = 'webi';
		
		//[TODO] REFACTOR so the table has the same value
		dispatch(getDataDictionaryApplications({
			limit: 25,
			type: 'sqlusers'
		}));
	//	console.log(location);
        // Output: '?id=1&type=Pizza'
        // Output: '#id=1&type=Pizza'
//    dispatch(fetchUserById())
  },[data,dispatch])
 
  return (
    <Paper>
			<MUIDataTable
				title={"TEST"}
				data={data}
				columns={columns}
				options={TableOptions}
			/>

    </Paper>
  );
}



import React, { useEffect, useState } from 'react';
import { RootState } from 'app/rootReducer';
import { useSelector,useDispatch } from 'react-redux';
import { Paper } from "@material-ui/core";
import { getInstances } from './InstanceSlice';
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
				name: "SI_ID",
				label: "Object ID",
			},
			{
				name: "System_Name",
				label: "Enviroment",
			},
			{
				name: "SI_NAME",
				label: "Instance Name",
			},
			{
				name: "SI_SCHEDULE_STATUS",
				label: "Instance Type",
			},
			{
				name: "SI_STARTTIME",
				label: "Instances Scanned",
			},
			{
				name: "SI_ENDTIME",
				label: "Scan Date",
			},
			{
				name: "SI_UPDATE_TS",
				label: "Last Scan Pulse",
			},
			{
				name: "SI_ERROR_MESSAGE",
				label: "Last Scanned Instance ID",
			},
			{
				name: "SI_SUBMITTER",
				label: "Configutation XML",
			},
			{
				name: "SI_PROGID",
				label: "Configutation XML",
			},
			{
				name: "SI_STARTTIME",
				label: "Configutation XML",
			},
			{
				name: "SI_ENDTIME",
				label: "Configutation XML",
			},
			{
				name: "SI_UPDATE_TS",
				label: "Configutation XML",
			},
			{
				name: "SI_ERROR_MESSAGE",
				label: "Configutation XML",
			},
			{
				name: "SI_SUBMITTER",
				label: "Configutation XML",
			},
			{
				name: "SI_PROGID",
				label: "Configutation XML",
			},
			{
				name: "AP_Location",
				label: "Configutation XML",
			},
			{
				name: "AP_Parameters",
				label: "Configutation XML",
			},
			{
				name: "AP_Destination",
				label: "Configutation XML",
			},
			{
				name: "AP_Alert",
				label: "Configutation XML",
			},
			{
				name: "AP_Alert",
				label: "Configutation XML",
			},
			{
				name: "AP_Database",
				label: "Configutation XML",
			},
			{
				name: "SI_NOTIFICATION",
				label: "Configutation XML",
			},
			{
				name: "SI_FILEPATH",
				label: "Configutation XML",
			},
			{
				name: "SI_CREATION_TIME",
				label: "Configutation XML",
			},
			{
				name: "AP_FileSize",
				label: "Configutation XML",
			},
			{
				name: "SI_SCHED_NOW",
				label: "Configutation XML",
			},
			{
				name: "SI_RECURRING",
				label: "Configutation XML",
			},

		];

export default function InstanceList(props:IProps) {
	const dispatch = useDispatch();
	console.log('SCAN LIST PROPS', props);

 const scans = useSelector(
   (state: RootState) => {
     console.log('USE SELECT RootState', state);
     return state.instances
   });
	console.log('name',props);

  useEffect(() => {
		console.debug('DISPATCHING FETCH', 'current', scans);
		const type = 'webi';
		dispatch(getInstances(type));
	//	console.log(location);
        // Output: '?id=1&type=Pizza'
        // Output: '#id=1&type=Pizza'
//    dispatch(fetchUserById())
  },[scans,dispatch])
 
  return (
    <Paper>
			<MUIDataTable
				title={"TEST"}
				data={scans}
				columns={columns}
				options={TableOptions}
			/>
    </Paper>
  );
}



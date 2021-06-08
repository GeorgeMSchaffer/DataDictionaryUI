import React, { useEffect, useState } from 'react';
import { RootState } from 'app/rootReducer';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {useDispatch, useSelector } from 'react-redux';
import {getInstances, getInstancesAsyncThunk } from './InstanceSlice';
import { useLocation,useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Paper, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import instance from './mockInstanceAPI'

import MUIDataTable, {
	ExpandButton,
	MUIDataTableColumn,
	MUIDataTableOptions,
	MUIDataTableProps,
} from "mui-datatables";
import queryString from 'query-string';
import instances from 'features/instances/InstanceSlice';
import { IInstance } from '../types';

interface IProps {
		si_id?: Number;
		instances?: IInstance[]
	};
	interface IState { 
		instances: IInstance[]
	};

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


export default function InstanceList(props: IProps) {
	const columns: MUIDataTableColumn[] = [
			{
				name: "SI_ID",
				label: "Object ID",
				options: {
					customBodyRender: (data, dataIndex, rowIndex) => {
						const si_id = data;
						return (
							<Button onClick={()=>openInstanceDetailModal(si_id)}>Details</Button>
						)
					}

				}
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

	const [isModelOpen,setIsModelOpen] = useState(true);

	const { si_id } = props;

	const openInstanceDetailModal = (si_id: number) => {
		console.log('OPEN INSTANCE DETAIL MODEL CALLED', si_id,'isModelOpen',isModelOpen);
		setIsModelOpen(true);
	}
	const onHandleClose = () => {
		setIsModelOpen(false)
	}

	const dispatch = useAppDispatch();
	console.log('SCAN LIST PROPS', props);

	const instances = useSelector((state:RootState)=>{
		console.log('USE SELECTOR',state);
		return state.instances.instances;
	  });
	

  useEffect(() => {
		console.debug('DISPATCHING FETCH', 'current', instances);
		dispatch(getInstancesAsyncThunk());
	//	console.log(location);
		// Output: '?id=1&type=Pizza'
		// Output: '#id=1&type=Pizza'
//    dispatch(fetchUserById())
  },[instances,dispatch]);
 
  return (
	<Paper>
		<b>Number of results:</b> {instances.length}
		  <br />
		  {(isModelOpen)
			  ? <Paper><InstanceModal onClose={onHandleClose} data={instance.Root.Object[0]} open={true}/></Paper>
				: ''
			}
		<MUIDataTable
				title={"TEST"}
				data={instances}
				columns={columns}
				options={TableOptions}
			/>
	</Paper>
  );
}

export interface DialogProps {
	open: boolean;
	data: IInstance,
	onClose(): any
}

export function InstanceModal(props:DialogProps) {
	const { open, data,onClose } = props;
	console.log('INSTANCE MODAL', props);
	return (
		<Dialog open={true}>
			<Paper>
			<DialogTitle>Instance Details</DialogTitle>
				<DialogContent>The detail info goes here
					Cluster:
					SI_ID:
					SI_PARENTID:
					SI_LOCATION:
					InstanceName,
					SchedulingInfo,
					PluginInterface,
					InstanceManagerSearch,
					ObjectManagerValidationManagerWebiMigratorSearch,
					APOS,
					ObjectProperties: {data.ObjectProperties}		
					KEYS {JSON.stringify(Object.keys(data))}
				<hr/>
					{JSON.stringify(data)}

			</DialogContent>
			<DialogActions><Button onClick={()=>onClose()}>Close</Button></DialogActions>
			</Paper>
	   </Dialog>

   )
}
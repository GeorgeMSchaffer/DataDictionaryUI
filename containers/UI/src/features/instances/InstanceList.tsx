import React, { useEffect, useState } from 'react';
import { RootState } from 'app/rootReducer';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {useDispatch, useSelector } from 'react-redux';
import {getInstances, getInstancesAsyncThunk } from './InstanceSlice';
import { useLocation,useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Paper, Button, DialogActions, DialogContent, DialogTitle, Typography,List,ListItem } from '@material-ui/core';
import instance from './mockInstanceAPI'
import { IInstanceProps } from '../../features/types';

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
		console.log('INSTANCE PROPS ARE', instance);
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
			  ? <Paper><InstanceModal data={instance} onClose={onHandleClose} open={true} /></Paper>
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
	data: any,
	onClose(): any
}

export function InstanceModal(props:DialogProps) {
	const { open, data, onClose } = props;
	console.log('INSTANCE MODAL', props);
	return (
		<Dialog open={true}>
			<Paper>
			<DialogTitle>Instance Details</DialogTitle>
				<DialogContent>The detail info goes here
				<List>
					<ListItem>Cluster: {data.Cluster}</ListItem>
					<ListItem>SI_ID {data.SI_ID}:</ListItem>
					<ListItem>SI_PARENTID: {data.SI_PARENTID}</ListItem>
					<ListItem>SI_LOCATION: {data.SI_LOCATION}</ListItem>
					<ListItem>InstanceName,{data.InstanceName}</ListItem>
						<ListItem>SchedulingInfo:
							<List>
								<ListItem>Type:{data.SchedulingInfo.Type}</ListItem>
								<ListItem>Dependencies:{data.SchedulingInfo.Dependencies}</ListItem>
								<ListItem>Begin Date:{data.SchedulingInfo.BeginDate}</ListItem>
								<ListItem>End Date:{data.SchedulingInfo.EndDate}</ListItem>
								<ListItem>RetriesAllowed:{JSON.stringify(data.SchedulingInfo.RetriesAllowed)}</ListItem>
								<ListItem>Notification: {JSON.stringify(data.SchedulingInfo.Notification)}</ListItem>
								<ListItem>Type {JSON.stringify(data.SchedulingInfo.RetriesAllowed)} </ListItem>
								<ListItem>Dependants {JSON.stringify(data.SchedulingInfo.RetriesAllowed)}</ListItem>
								<ListItem>Dependencies {JSON.stringify(data.SchedulingInfo.Dependencies)}</ListItem>
								<ListItem>BeginDate {JSON.stringify(data.SchedulingInfo.BeginDate)}</ListItem>
								<ListItem>EndDate {JSON.stringify(data.SchedulingInfo.EndDate)}</ListItem>
								<ListItem>RetriesAllowed {JSON.stringify(data.SchedulingInfo.RetriesAllowed)}</ListItem>
								<ListItem>RetryInterval {JSON.stringify(data.SchedulingInfo.RetryInterval)}</ListItem>
								<ListItem>AlertDestination {JSON.stringify(data.SchedulingInfo.AlertDestination)}</ListItem>
								<ListItem>Notification {JSON.stringify(data.SchedulingInfo.Notification)}</ListItem>
								<ListItem>SI_Cleanup {JSON.stringify(data.SchedulingInfo.SI_Cleanup)}</ListItem>
								<ListItem>SI_NAME{JSON.stringify(data.SchedulingInfo.Notification.SI_NAME)}</ListItem>
								<ListItem>SI_OBJID:{JSON.stringify(data.SchedulingInfo.Notification.SI_OBJID)}</ListItem>
								<ListItem>SI_ENDTIME{JSON.stringify(data.SchedulingInfo.Notification.SI_ENDTIME)}</ListItem>
								<ListItem>SI_STARTTIME{data.SchedulingInfo.Notification.SI_STARTTIME}</ListItem>
								<ListItem>SI_MACHINE_USED:{data.SchedulingInfo.Notification.SI_MACHINE_USED}</ListItem>
								<ListItem>SI_RETRIES_ATTEMPTED:{JSON.stringify(data.SchedulingInfo.Notification.SI_RETRIES_ATTEMPTED)}</ListItem>
								<ListItem>SI_RUN_ON_TEMPLATE:{data.SchedulingInfo.Notification.SI_NAME}</ListItem>
								<ListItem>SI_SCHED_NOW:{JSON.stringify(data.SchedulingInfo.SI_SCHED_NOW)}</ListItem>
								<ListItem>SI_SUBMITTER:{data.SchedulingInfo.Notification.SI_NAME}</ListItem>
								<ListItem>SI_SUBMITTERID:{data.SchedulingInfo.Notification.SI_NAME}</ListItem>
								<ListItem>SI_TIMEZONE_ID:{JSON.stringify(data.SchedulingInfo.Notification.SI_NAME)}</ListItem>
								<ListItem>SI_UISTATUS:{JSON.stringify(data.SchedulingInfo.Notification.SI_NAME)}</ListItem>
								<ListItem>SI_OUTCOME:{JSON.stringify(data.SchedulingInfo.Notification.SI_NAME)}</ListItem>
								<ListItem>SI_PROGRESS:{JSON.stringify(data.SchedulingInfo.Notification.SI_APS_NAME)}</ListItem>
								<ListItem>SI_APS_NAME:{JSON.stringify(data.SchedulingInfo.Notification.SI_APS_NAME)}</ListItem>
								<ListItem>SI_APS_STARTIME:{JSON.stringify(data.SchedulingInfo.Notification.SI_APS_STARTIME)}</ListItem>
								<ListItem>SI_SCHEDULE_INTERVAL_NDAYS:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_INTERVAL_NDAYS)}</ListItem>
								<ListItem>SI_SCHEDULE_FLAGS:{data.SchedulingInfo.Notification.SI_SCHEDULE_FLAGS}</ListItem>
								<ListItem>SI_SCHEDULE_TYPE:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_TYPE)}</ListItem>
								<ListItem>SI_SCHEDULE_INTERVAL_MINUTES:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_INTERVAL_MINUTES)}</ListItem>
								<ListItem>SI_SCHEDULE_INTERVAL_HOURS:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_INTERVAL_HOURS)}</ListItem>
								<ListItem>SI_SCHEDULE_INTERVAL_MONTHS:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_INTERVAL_HOURS)}</ListItem>
								<ListItem>SI_SCHEDULE_INTERVAL_NTHDAY:{JSON.stringify(data.SchedulingInfo.Notification.SI_SCHEDULE_INTERVAL_NTHDAY)}</ListItem>
								<ListItem>SI_TYPE:{JSON.stringify(data.SchedulingInfo.Notification.SI_TYPE)}</ListItem>
								<ListItem>SI_PID:{JSON.stringify(data.SchedulingInfo.Notification.SI_PID)}</ListItem>							
							</List>
						</ListItem>
				</List>
					<hr />
					SCHEDULING INFO KEYS:  {JSON.stringify(Object.keys(data.SchedulingInfo))}
					<hr />
				SCHEDULING INFO DATA:	{JSON.stringify(data.SchedulingInfo)}

			</DialogContent>
			<DialogActions><Button onClick={()=>onClose()}>Close</Button></DialogActions>
			</Paper>
	   </Dialog>

   )
}
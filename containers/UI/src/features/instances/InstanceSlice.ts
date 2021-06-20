import { createSlice, PayloadAction,AsyncThunkAction,createAsyncThunk,createAction,createReducer } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store'
import { IInstances } from 'features/types';
import { getUrlParameter} from 'utils/request';
import axios from 'axios';

const initialState: IInstances[] = [
	{
		SI_ID : 684654
		,System_Name : 'PROD'
		,SI_NAME : 'Working Trial Balance'
		,SI_SCHEDULE_STATUS: 3
		,SI_STARTTIME : '20210430100638'
		,SI_ENDTIME : '20210506065038'
		,SI_UPDATE_TS: '20210506065038' 
		,SI_ERROR_MESSAGE: 'Maximum binary output size limit reached. Contact your BusinessObjects administrator. (Error: ERR_WIS_30271)'
		,SI_SUBMITTER: 'ADG_U147529'
		,SI_PROGID: 'CrystalEnterprise.Txt'
		,AP_Location: '/General Topics/Vendor Information/Disbursements by Vendor'
		,AP_Parameters: '1. Enter Start Disbursement Date Range(mm/dd/yyyy):= 7/1/2017 5:00:00 PM, 2. Enter End Disbursement Date Range(mm/dd/yyyy):= 9/30/2022 5:00:00 PM, Enter Vendor Code:= '
		,AP_Destination: 'SMTP (Includes 1 Attachment): Sender: (Evelyn.gonzales@pima.gov): Evelyn.gonzales@pima.gov'
		,AP_Alert: ''
		,AP_Database: ''
		,SI_NOTIFICATION: ''
		,SI_FILEPATH: 'frs://Output/a_233/110/088/5795561/'
		,SI_CREATION_TIME: '20210506064811'
		,AP_FileSize: 1038770
		,SI_SCHED_NOW: 0
		,SI_RECURRING:0 
		,SI_Schedule_Type: 'NthDay - 6'
		,SI_LAST_RUN_TIME: '20210430100638'
		,SI_OWNER : 'ADG_U127097'
	}
];

const setInstances = createAction<IInstances[]>('getScans')

const instanceSlice = createSlice({
	name: "instances",
	initialState,
	reducers: {
		setInstances(state, action: PayloadAction<IInstances>) {
//			debugger;
			console.log('IN Fetch, state passed', state)
			console.log('action', action, 'action.payload', action.payload);
			state.concat(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setInstances, (state, action) => {
//			debugger;
			console.log('ADD CASE Payload', action.payload, action.type);
			return state.concat(action.payload);
		})
	}
});


export const getInstances = (
    type: string | undefined
): AppThunk => async (dispatch: AppDispatch) => {
//	const type = getUrlParameter('type');
//	console.log('TYPE', type);
			const res = await axios.get(`/instances/failed/`);
		console.log('DISPATCHING RESULTS TO SET', res.data.recordsets);
	dispatch(instanceSlice.actions.setInstances(res.data.recordsets));
}

// export const getInstances = createAsyncThunk(
// 	'users/fetchByIdStatus',
// 	async (userId, thunkAPI) => {
// 		const dispatch = useDispatch();
// 		const res = await axios.get('instances/scans/status/type/webi');
// 		console.log('DISPATCHING RESULTS TO SET', res.data.recordsets);
// 		dispatch(instanceSlice.actions.setInstances(res.data.recordsets));
// 		dispatch(setInstances(res.data.recordsets));
// 	}
// );
export default instanceSlice.reducer;
//const { setInstances } = instanceSlice;
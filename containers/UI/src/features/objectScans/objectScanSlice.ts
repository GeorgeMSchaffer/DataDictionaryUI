import { createSlice, PayloadAction,AsyncThunkAction,createAsyncThunk,createAction,createReducer } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store'
import { IObjectScanResult,IInstanceProps } from 'features/types';
import { getUrlParameter} from 'utils/request';
import axios from 'axios';

//[TODO] refactor that instances and instanceDetails are part of the slice interface

const initialState: IObjectScanResult[] = [
	{
		"AP_Info_Date": "20201231145600",
		"System_Name": "PROD",
		"AP_Status": "Started",
		"AP_Object_Type": "Webi",
		"AP_Objects_Scanned": 0
	},
	{
		"AP_Info_Date": "20201231141239",
		"System_Name": "TEST",
		"AP_Status": "Finished",
		"AP_Object_Type": "Webi",
		"AP_Objects_Scanned": 0
	},
	{
		"AP_Info_Date": "20201231085652",
		"System_Name": "PROD",
		"AP_Status": "Finished",
		"AP_Object_Type": "Webi",
		"AP_Objects_Scanned": 0
	},
	{
		"AP_Info_Date": "20201230102059",
		"System_Name": "TEST",
		"AP_Status": "Finished",
		"AP_Object_Type": "Webi",
		"AP_Objects_Scanned": 0
	}
];

const setObjectScans = createAction<IObjectScanResult[]>('getObjectScans')

const objectScanSlice = createSlice({
	name: "objectScans",
	initialState,
	reducers: {
		setObjectScans(state, action: PayloadAction<IObjectScanResult>) {
//			debugger;
			console.log('IN Fetch, state passed', state)
			console.log('action', action, 'action.payload', action.payload);
			state.concat(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setObjectScans, (state, action) => {
//			debugger;
			console.log('ADD CASE Payload', action.payload, action.type);
			return state.concat(action.payload);
		})
	}
});


export const getObjectScans = (
    type: string | undefined
): AppThunk => async (dispatch: AppDispatch) => {
	const type = getUrlParameter('type');
//	console.log('TYPE', type);
			const res = await axios.get(`objects/scans/status/type/${type}`);
		console.log('DISPATCHING RESULTS TO SET', res.data.recordsets);
	dispatch(objectScanSlice.actions.setObjectScans(res.data.recordsets));
}

// export const getObjectScans = createAsyncThunk(
// 	'users/fetchByIdStatus',
// 	async (userId, thunkAPI) => {
// 		const dispatch = useDispatch();
// 		const res = await axios.get('objects/scans/status/type/webi');
// 		console.log('DISPATCHING RESULTS TO SET', res.data.recordsets);
// 		dispatch(objectScanSlice.actions.setObjectScans(res.data.recordsets));
// 		dispatch(setObjectScans(res.data.recordsets));
// 	}
// );
export default objectScanSlice.reducer;
//const { setObjectScans } = objectScanSlice;
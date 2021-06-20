import { createSlice, PayloadAction,AsyncThunkAction,createAsyncThunk,createAction,createReducer } from '@reduxjs/toolkit';
import { useSelector,useDispatch } from 'react-redux';
import { AppThunk, AppDispatch } from 'app/store'
import { IDataDictionaryApplication,IDataDictionaryDatabases,IDataDictionarySqlUsers } from 'features/types';
import { getUrlParameter} from 'utils/request';
import axios from 'axios';
import { getDate } from 'date-fns';
interface IState {
	  applications: IDataDictionaryApplication[],
	databases: IDataDictionaryDatabases[]

}

const initialState = <IState>{
	applications: [{
			"Id": 14,
			"RowSts": "A",
			"AppNam": "ADP",
			"Domain": "CENTRAL",
			"GrpPfx": "ITD",
			"AppTyp": "C",
			"LngNam": "ADP Interface",
			"AppDsc": "ADP Interface"
		}],
	databases: [{
			"Id": 1,
			"RowSts": 'A',
			"AppNam": 'ADP',
			"SrvNam": 'ADPEV5',
			"DbNam": 'String',
			"AppTyp": 'String'
	}]
}


const setApplications = createAction<IDataDictionaryApplication[]>('getDataDictionaryApplications')

const dataDictionarySlice = createSlice({
	name: "dataDictionary",
	initialState,
	reducers: {
		setDataDictionaryApplications(state, action: PayloadAction<IDataDictionaryApplication>) {

			console.log('IN setDataDictionaryApplications, state passed', state)
			console.log('action', action, 'action.payload', action.payload);
			state.applications.concat(action.payload);
		},
		setDataDictionaryDatabases(state, action: PayloadAction<IDataDictionaryDatabases>) {

			console.log('IN setDataDictionaryApplications, state passed', state)
			console.log('action', action, 'action.payload', action.payload);
			state.databases.concat(action.payload);
		},
		setDataDictionarySqlUsers(state, action: PayloadAction<IDataDictionarySqlUsers>) {
			console.log('IN setDataDictionarySqlUsers, state passed', state)
			console.log('action', action, 'action.payload', action.payload);
			//debugger;
			//state.sqlusers.push(action.payload);
			//state.sqlusers;
		},
	},
	extraReducers: (builder) => {
		/*
		builder.addCase(setObjectScans, (state, action) => {
			console.log('ADD CASE Payload', action.payload, action.type);
			return state.concat(action.payload);
		})
		*/
	}
});


	 /*
export const getObjectScans = createAsyncThunk(
  "fetchObjectScans",
	async (userId, thunkAPI) => {
		const dispatch = useDispatch();
		const res = await axios.get('objects/scans/status/type/webi');
		console.log('RECEIVED', res.data.recordsets)
		if (res.data.recordsets) {
			debugger;
			dispatch(setObjectScans(res.data.recordsets));
		}
		else {
			console.log('FAILED TO RECEIVE VALID RESULTS')
		}
  }
)
*/
//[TODO]  Should create a ENUM to limit the choice of type to valid ones
interface IArgs {
	limit: Number | String
	type:String
}

export const getDataDictionaryApplications = (args: IArgs): AppThunk => async (dispatch: AppDispatch) => {
	const { limit=25, type='applications' } = args;
//	console.log('TYPE', type);
	const res = await axios.get(`/datadictionary/${type}/?limit=${limit}`);
	console.dir('RES!', res.data);
		console.log('DISPATCHING RESULTS TO SET', res.data.data);
	dispatch(dataDictionarySlice.actions.setDataDictionaryApplications(res.data.data));
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
export default dataDictionarySlice.reducer;
//const { setObjectScans } = objectScanSlice;
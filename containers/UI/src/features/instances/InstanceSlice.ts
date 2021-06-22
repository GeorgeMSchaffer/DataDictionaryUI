import { createSlice, PayloadAction,AsyncThunkAction,createAsyncThunk,createAction,createReducer } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'app/store'
import { IInstance } from 'features/types';
import { getUrlParameter} from 'utils/request';
import axios from 'axios';
import {fetchInstances} from './mockInstancesAPI'

interface IState {
	instances: IInstance[],
	status: 'idle' | 'loading' | 'failed';
}
const initialState= <IState>{
	instances: [],
	status:'idle'
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getInstancesAsyncThunk = createAsyncThunk(
	'instances/getInstances',
	async () => {
		console.log('STARTING getInstancesAsyncThunk()')
	  //const res = await axios.get(`/apos/instances/failed/`);
		const res = await fetchInstances();
	  console.log('getInstancesAsync() FETCH INSTANCES RETURNED WITH RES', res);
	  //dispatch(instanceSlice.actions.setInstances(res.data.data));
		return res.data.data;
	}
  );
const instanceSlice = createSlice({
	name: "instances",
	initialState,
	reducers: {
		setInstances(state, action: PayloadAction<any>) {
			console.log('CREATE SLICE initialState',initialState);
			console.log('VS passed', state);
			console.log('action', action, 'action.payload.data', action);
			state.instances.concat(action.payload);
		},
	},
	 extraReducers: (builder) => {
    builder
      .addCase(getInstancesAsyncThunk.pending, (state) => {
        console.log('INSIDE PENDING CASE',state)
        state.status = 'loading';
      })
      .addCase(getInstancesAsyncThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('INSIDE FULLFILED CASE',state,'ACTION:',action);
        state.instances = action.payload;
      })
      .addCase(getInstancesAsyncThunk.rejected, (state, action) => {
        state.status = 'failed';
        console.log('INSIDE rejected CASE',state,'ACTION:',action);
        //state.instances = action.payload;
      });
	 }
});



export const getInstances = async function (args: any) {
  console.log('STARTE GET INSTANCE');
	//const instances = await getInstancesAsync();
	const instances = await getInstancesAsyncThunk()
	//console.log('GOT INSTANCES, STARTING SET', res.data.data);
	instanceSlice.actions.setInstances(instances);
}

// // export const getInstances = createAsyncThunk(
// // 	'users/fetchByIdStatus',
// // 	async (userId, thunkAPI) => {
// // 		const dispatch = useDispatch();
// // 		const res = await axios.get('instances/scans/status/type/webi');
// // 		console.log('DISPATCHING RESULTS TO SET', res.data.recordsets);
// // 		dispatch(instanceSlice.actions.setInstances(res.data.recordsets));
// // 		dispatch(setInstances(res.data.recordsets));
// // 	}
// // );
export default instanceSlice.reducer;
//const { setInstances } = instanceSlice;
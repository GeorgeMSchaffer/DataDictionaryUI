import { combineReducers } from '@reduxjs/toolkit'

import todos from 'features/todoList/todoSlice';
import objectScans from 'features/objectScans/objectScanSlice';
import instances from 'features/instances/InstanceSlice';
import visibilityFilter from 'features/visibilityFilter/visibiltyFilterSlice';
import dataDicitionaryApplications from 'features/dataDictionary/dataDictionarySlice';
console.log('ROOT REDUCER INSTANCES',instances);
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  objectScans,
  dataDicitionaryApplications,
  instances
})

export type RootState = ReturnType<typeof rootReducer>
console.log('ROOT REDUCER', rootReducer);
export default rootReducer
import React from 'react';
import logo from './logo.svg';
import AddTodo from 'features/todoList/AddTodo';
//import '../App.css';
import TodoList from '../features/todoList/TodoList';
import ObjectScanList from 'features/objectScans/ObjectScansList';
import SqlServerUsers from 'features/dataDictionary/SqlUsersList';
import ApplicationList from 'features/dataDictionary/DataDictionaryList';
import Databases from 'features/dataDictionary/databasesList'
import DataDictionarySqlUsersList from 'features/dataDictionary/SqlUsersList';
import InstanceList from 'features/instances/InstanceList';
import { RouteProps } from "react-router";
//import { queryString }  from "query-string";

//type TParams = { id: string };

type IProps = {
	match: string,
	location: RouteProps["location"],
	children: RouteProps["children"],
}

function App(props: IProps) {
	const { match, location, children } = props;
	//console.log(window.location.search);
  return (
    <div className="App">
      <InstanceList/>

    </div>
  );
}

export default App;

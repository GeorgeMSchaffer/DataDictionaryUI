import React from 'react';
import logo from './logo.svg';
import AddTodo from 'features/todoList/AddTodo';
//import '../App.css';
import TodoList from '../features/todoList/TodoList';
import ObjectScanList from 'features/objectScans/ObjectScansList';
import DataDictionaryApplicationsList from 'features/dataDictionary/DataDictionaryList';
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
      <h1>Todos</h1>
      <AddTodo />
      <TodoList />
      <h2>Object Scans</h2>
      <ObjectScanList />
      <h2>Applications</h2>
      <DataDictionaryApplicationsList/>
    </div>
  );
}

export default App;

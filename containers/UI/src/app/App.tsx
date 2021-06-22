import React, { Fragment } from 'react';
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
import {BrowserRouter as Router,Route,Link,Switch,useParams } from "react-router-dom";

//import { queryString }  from "query-string";

//type TParams = { id: string };

type IProps = {
	match: string,
	location: RouteProps["location"],
	children: RouteProps["children"],
}

function App(props: IProps) {
	const { match, location, children } = props;
	console.log('APP PROPS',props);
  const Instances = () => {
    const params = useParams();
    console.log('USE PARAMS',params);
    return (
    <Fragment>
        <InstanceList></InstanceList>
    </Fragment>
    )
  }
  return (
    <Router>
      
    <div className="App">
    <main>
      <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><Link to={`/instances/1203995`}>Props</Link></li>
          </ul>
        </nav>
      <Switch>
      <Route path="/" component={Instances} />
      </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import appReducers from '../../reducers';
import mySaga from '../../saga/sagas'

import createSagaMiddleware from 'redux-saga'
import './App.css';
import SignIn from '../signIn/SignIn';
import SignUp from "../signUp/SignUp";
import Portfolio from '../portfolio/Portfolio';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    appReducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            language: 'rus',
        }

    }


  render() {
    return (
        <Router>
            <Provider store={store}>
            <Switch>

          <Route exact path="/" component={Portfolio} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />

            </Switch>
        </Provider>
        </Router>
    );
  }
}

export default App;

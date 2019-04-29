import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import appReducers from '../../reducers';
import mySaga from '../../saga/sagas'
import history from "../../history/history";
import createSagaMiddleware from 'redux-saga'
import SignIn from '../signIn/SignIn';
import SignUp from "../signUp/SignUp";
import Table from '../table/Table';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    appReducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
        }
    }

    render() {
        return (
            <Router history={history}>
                <Provider store={store}>
                    <Switch>

                        <Route exact path="/" component={Table}/>
                        <Route path="/SignIn" component={SignIn}/>
                        <Route path="/SignUp" component={SignUp}/>

                    </Switch>
                </Provider>
            </Router>
        );
    }
}

export default App;

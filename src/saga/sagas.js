import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import signin from '../api/signin';
import signup from '../api/signup';
import accountInfo from '../api/accountInfo';
import getStocks from '../api/getStocks';
import refresh from '../api/refresh';
import sell from '../api/sell';
import buy from '../api/buy';
import transactionHistory from '../api/transactionHistory';
import stockHistory from '../api/stockHistory';
import history from "../history/history";
import {
    SIGN_IN,
    SIGN_UP,
    REFRESH,
    ADD_ACCOUNT_INFO,
    ADD_STOCKS,
    BUY,
    SELL,
    TRANSACTION_HISTORY,
    WRONG_CREDENTIALS,
    STOCK_HISTORY
} from "../constants/constants";


function* signin_saga(action) {
    try {
        const tokens = yield call(signin, action.payload);
        console.log('saga_SIGNIN', tokens);
        if(tokens.code === WRONG_CREDENTIALS)
            yield put({type: WRONG_CREDENTIALS, payload: tokens.message});
        else{
            yield put({type: "ADD_TOKEN", payload: tokens});
            yield put({type: ADD_ACCOUNT_INFO, payload: tokens.accessToken});
            yield put({type: ADD_STOCKS, payload: {    accessToken: tokens.accessToken,
                                                            search: '',
                                                    stocksQuantity: 10}});
            yield put({type: TRANSACTION_HISTORY, payload: {   accessToken: tokens.accessToken,
                                                                    search: '',
                                                            stocksQuantity: 10}});
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}


function* signup_saga(action) {
    try {
        const tokens = yield call(signup, action.payload);
        console.log('saga_SIGNUP', tokens);
        yield put({type: "ADD_TOKEN", payload: tokens});
        yield put({type: ADD_ACCOUNT_INFO, payload: tokens.accessToken});
        yield put({type: ADD_STOCKS, payload: {    accessToken: tokens.accessToken,
                                                        search: '',
                                                stocksQuantity: 10}});
        yield put({type: TRANSACTION_HISTORY, payload: {   accessToken: tokens.accessToken,
                                                                search: '',
                                                        stocksQuantity: 10}});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchAccountInfo(action) {
    try {
        yield put({type: "ACCOUNT_INFO_LOADING"});
        const data = yield call(accountInfo, action.payload);

        if(data!==undefined){
            yield put({type: "ACCOUNT_INFO_LOADED", payload: data});
            /*history.push('')*/
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchStocks(action) {
    try {
        const data = yield call(getStocks, action.payload);
        if(data!==undefined){
            yield put({type: "STOCKS_LOADED", payload: data});
            history.push('')
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* refresh_saga(action) {
    try {
        const data = yield call(refresh, action.payload);
        yield put({type: "DONE_REFRESH", payload: data});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* buy_saga(action) {
    try {
        const data = yield call(buy, action.payload);
        yield put({type: "DONE_BUY", payload: data});
        yield put({type: "ADD_ACCOUNT_INFO", payload: action.payload.accessToken});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* sell_saga(action) {
    try {
        const data = yield call(sell, action.payload);
        yield put({type: "DONE_SELL", payload: data});
        yield put({type: "ADD_ACCOUNT_INFO", payload: action.payload.accessToken});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* t_history_saga(action) {
    try {
        const data = yield call(transactionHistory, action.payload);
        console.log(data);
        yield put({type: "DONE_TRANSACTION_HISTORY", payload: data});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* s_history_saga(action) {
    try {
        const data = yield call(stockHistory, action.payload);
        console.log(data);
        yield put({type: "DONE_STOCK_HISTORY", payload: data});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeEvery(SIGN_IN, signin_saga);
    yield takeEvery(SIGN_UP, signup_saga);
    yield takeEvery(ADD_ACCOUNT_INFO, fetchAccountInfo);
    yield takeEvery(ADD_STOCKS, fetchStocks);
    yield takeEvery(REFRESH, refresh_saga);
    yield takeEvery(BUY, buy_saga);
    yield takeEvery(SELL, sell_saga);
    yield takeEvery(TRANSACTION_HISTORY, t_history_saga);
    yield takeEvery(STOCK_HISTORY, s_history_saga);
}

export default mySaga;

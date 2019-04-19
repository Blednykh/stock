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
    TOKEN_EXPIRED,
    STOCK_HISTORY,
    ACCOUNT_INFO_LOADING,
    SIGN_FAIL,
    ADD_TOKEN,
    ACCOUNT_INFO_LOADED,
    STOCKS_LOADED,
    DONE_BUY,
    DONE_SELL,
    DONE_TRANSACTION_HISTORY,
    DONE_STOCK_HISTORY
} from "../constants/constants";


function* signin_saga(action) {
    try {
        const tokens = yield call(signin, action.payload);
        yield put({type: ACCOUNT_INFO_LOADING});
        if(tokens.code === WRONG_CREDENTIALS){
            yield put({type: WRONG_CREDENTIALS, payload: tokens.message});
            yield put({type: SIGN_FAIL});
        }
        else{
            yield put({type: ADD_TOKEN, payload: tokens});
            yield put({type: ADD_ACCOUNT_INFO, payload: tokens.accessToken});
            yield put({type: ADD_STOCKS, payload: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    search: '',
                    stocksQuantity: 10,
                    itemId: 0
            }});
            yield put({type: TRANSACTION_HISTORY, payload: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    search: '',
                    stocksQuantity: 10,
                    itemId: 0
            }});
            /*yield put({type: "SET_COMPONENTS_POSITION",
                payload: {
                    positionTop: [120,120,120,120],
                    positionLeft: [20, 350, 680, 1010],
                    zIndex: [1,2,3,4]}});*/
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}


function* signup_saga(action) {
    try {
        const tokens = yield call(signup, action.payload);
        yield put({type: ACCOUNT_INFO_LOADING});
        yield put({type: ADD_TOKEN, payload: tokens});
        yield put({type: ADD_ACCOUNT_INFO, payload: tokens.accessToken});
        yield put({type: ADD_STOCKS, payload: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                search: '',
                stocksQuantity: 10,
                itemId: 0
        }});
        yield put({type: TRANSACTION_HISTORY, payload: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                search: '',
                stocksQuantity: 10,
                itemId: 0
        }});
      /*  yield put({type: "SET_COMPONENTS_POSITION",
            payload: {
                positionTop: [90,90,90,90],
                positionLeft: [20, 350, 680, 1010],
                zIndex: [1,2,3,4]}});*/
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchAccountInfo(action) {
    try {
        const data = yield call(accountInfo, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            yield put({type: ACCOUNT_INFO_LOADED, payload: data});
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* fetchStocks(action) {
    try {
        const data = yield call(getStocks, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            yield put({type: STOCKS_LOADED, payload: data});
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
        yield put({type: ADD_TOKEN, payload: data});
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* buy_saga(action) {
    try {
        const data = yield call(buy, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            yield put({type: DONE_BUY, payload: data});
            yield put({type: ADD_ACCOUNT_INFO, payload: action.payload.accessToken});
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* sell_saga(action) {
    try {
        const data = yield call(sell, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            yield put({type: DONE_SELL, payload: data});
            yield put({type: ADD_ACCOUNT_INFO, payload: action.payload.accessToken});
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* t_history_saga(action) {
    try {
        const data = yield call(transactionHistory, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            yield put({type: DONE_TRANSACTION_HISTORY, payload: data});
        }
    } catch (e) {
        console.log('saga_USER_FETCH_FAILED', e.message);
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* s_history_saga(action) {
    try {
        const data = yield call(stockHistory, action.payload);
        if(data.code === TOKEN_EXPIRED){
            yield put({type: REFRESH, payload: data.refreshToken});
        }
        else{
            //Немного изменяю дату, чтобы построить график, т.к. моки возвращают одну дату для двух точек
            data.history.forEach((item,id)=>{
                let dateParts = item.date.split("/");
                item.date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]+id);
            });
            yield put({type: DONE_STOCK_HISTORY, payload: data});
        }
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

import {
    SIGN_IN,
    SIGN_UP,
    REFRESH,
    ADD_ACCOUNT_INFO,
    ADD_STOCKS,
    BUY,
    SELL,
    TRANSACTION_HISTORY,
    STOCK_HISTORY
} from "../constants/constants";

/*export const select = (data) => {
    return{
        type: 'LOAD',
        payload: data
    }
};*/
export const signin = (data) => {
    return{
        type: SIGN_IN,
        payload: data
    }
};
export const signup = (data) => {
    return{
        type: SIGN_UP,
        payload: data
    }
};
export const refresh = (data) => {
    return{
        type: REFRESH,
        payload: data
    }
};
export const addAccountInfo = (accessToken) => {
    return{
        type: ADD_ACCOUNT_INFO,
        payload: accessToken
    }
};
export const addStocks = (data) => {
    return{
        type: ADD_STOCKS,
        payload: data
    }
};
export const buy = (data) => {
    return{
        type: BUY,
        payload: data
    }
};
export const sell = (data) => {
    return{
        type: SELL,
        payload: data
    }
};
export const transactionHistoty = (data) => {
    return{
        type: TRANSACTION_HISTORY,
        payload: data
    }
};
export const stockHistory = (data) => {
    return{
        type: STOCK_HISTORY,
        payload: data
    }
};
export const addShowedStocksInfoList = (data) => {
    return{
        type: 'ADD_SHOWED_STOCKS',
        payload: data
    }
};

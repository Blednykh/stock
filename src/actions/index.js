const SIGNIN = 'SIGNIN';

export const select = (data) => {
    return{
        type: 'LOAD',
        payload: data
    }
};
export const addUserName = (userName) => {
    return{
        type: 'ADD_USER_NAME',
        payload: userName
    }
};
export const addPassword = (password) => {
    return{
        type: 'ADD_PASSWORD',
        payload: password
    }
};
export const addToken = (data) => {
    return{
        type: 'ADD_TOKEN',
        payload: data
    }
};
export const addAccountInfo = (accessToken) => {
    return{
        type: 'ADD_ACCOUNT_INFO',
        payload: accessToken
    }
};
export const signin = (data) => {
    return{
        type: 'SIGNIN',
        payload: data
    }
};
export const signup = (data) => {
    return{
        type: 'SIGNUP',
        payload: data
    }
};
export const refresh = (data) => {
    return{
        type: 'REFRESH',
        payload: data
    }
};
export const addStocks = (data) => {
    console.log(data);
    return{
        type: 'ADD_STOCKS',
        payload: data
    }
};
export const buy = (data) => {
    return{
        type: 'BUY',
        payload: data
    }
};
export const sell = (data) => {
    return{
        type: 'SELL',
        payload: data
    }
};
export const transactionHistoty = (data) => {
    return{
        type: 'TRANSACTION_HISTORY',
        payload: data
    }
};
export const addShowedStocksInfoList = (data) => {
    return{
        type: 'ADD_SHOWED_STOCKS',
        payload: data
    }
};

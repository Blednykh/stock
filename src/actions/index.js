import {
    SIGN_IN,
    SIGN_UP,
    REFRESH,
    ADD_ACCOUNT_INFO,
    ADD_STOCKS,
    BUY,
    SELL,
    TRANSACTION_HISTORY,
    STOCK_HISTORY,
    ADD_SHOWED_STOCKS,
    SET_COMPONENTS_POSITION,
    LOGOUT,
    ADD_TOKEN
} from "../constants/constants";

export const signin = (data) => {
    return {
        type: SIGN_IN,
        payload: data
    }
};
export const signup = (data) => {
    return {
        type: SIGN_UP,
        payload: data
    }
};
export const refresh = (data) => {
    return {
        type: REFRESH,
        payload: data
    }
};
export const addAccountInfo = () => {
    return {
        type: ADD_ACCOUNT_INFO,
    }
};
export const addStocks = (data) => {
    return {
        type: ADD_STOCKS,
        payload: data
    }
};
export const buy = (data) => {
    return {
        type: BUY,
        payload: data
    }
};
export const sell = (data) => {
    return {
        type: SELL,
        payload: data
    }
};
export const transactionHistoty = (data) => {
    return {
        type: TRANSACTION_HISTORY,
        payload: data
    }
};
export const setStockHistory = (data) => {
    return {
        type: STOCK_HISTORY,
        payload: data
    }
};
export const addShowedStocksInfoList = (data) => {
    return {
        type: ADD_SHOWED_STOCKS,
        payload: data
    }
};
export const setComponentsPosition = (data) => {
    return {
        type: SET_COMPONENTS_POSITION,
        payload: data
    }
};

export const addToken = (data) => {
    return {
        type: ADD_TOKEN,
        payload: data
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

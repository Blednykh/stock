import {
    WRONG_CREDENTIALS,
    ADD_TOKEN,
    ADD_ACCOUNT_INFO,
    ACCOUNT_INFO_LOADING,
    ACCOUNT_INFO_LOADED,
    SIGN_FAIL,
    ADD_SHOWED_STOCKS,
    SET_COMPONENTS_POSITION,
    STOCKS_LOADED,
    DONE_TRANSACTION_HISTORY,
    DONE_STOCK_HISTORY,
    LOGOUT
} from "../constants/constants";

const initialState = {
    position: {
        positionTop: ["120px", "120px", "120px", "120px"],
        positionLeft: ["20px", "350px", "680px", "1010px"],
        zIndex: [1, 2, 3, 4]
    },
    history: {
        items: []
    },
    showedStocksList: [],
    stocks: [],
    items: [],
    balance: 0,
    stockHistory: {
        history: [{data: "", price: 0}]
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LOAD':
            return action.payload;
        case ADD_TOKEN:
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return state;
        case ADD_ACCOUNT_INFO:
            return state;
        case ACCOUNT_INFO_LOADING:
            return {...state, accountInfoLoading: 'inherit'};
        case SIGN_FAIL:
            return {...state, accountInfoLoading: 'none'};
        case ACCOUNT_INFO_LOADED:
            return {...state, ...action.payload, accountInfoLoading: 'none', showedStocksList: []};
        case STOCKS_LOADED:
            return {...state, ...action.payload};
        case ADD_SHOWED_STOCKS:
            return {...state, showedStocksList: action.payload};
        case DONE_TRANSACTION_HISTORY:
            return {...state, history: action.payload};
        case DONE_STOCK_HISTORY:
            return {...state, stockHistory: action.payload};
        case WRONG_CREDENTIALS:
            return {...state, displayErrorPasswordText: "inherit"};
        case SET_COMPONENTS_POSITION:
            return {...state, position: action.payload};
        case LOGOUT:
            state.accessToken = "";
            state.refreshToken = "";
            return state;
        default:
            return state;

    }
}

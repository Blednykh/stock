import {WRONG_CREDENTIALS} from "../constants/constants";

export default function (state = {}, action) {
    switch (action.type) {
        case 'LOAD':
            return action.payload;
        case 'ADD_TOKEN':
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            return state;
        case 'ADD_ACCOUNT_INFO':
            return state;
        case 'ACCOUNT_INFO_LOADING':
            return { ...state, accountInfoLoading: 'inherit'};
        case 'ACCOUNT_INFO_LOADED':
            return { ...state, ...action.payload, accountInfoLoading: 'none', showedStocksList: []};
        case 'STOCKS_LOADED':
            return { ...state, ...action.payload};
        case 'ADD_SHOWED_STOCKS':
            return { ...state, showedStocksList: action.payload};
        case 'DONE_TRANSACTION_HISTORY':
            return { ...state, history: [action.payload]};
        case 'DONE_STOCK_HISTORY':
            return { ...state, stockHistory: action.payload};
        case WRONG_CREDENTIALS:
            return {...state, displayErrorPasswordText: "inherit"};
        default:
            return state;

    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case 'LOAD':
        {
            return action.payload;
        }
        case 'ADD_USER_NAME':
            state.userName = action.payload;
            return state;
        case 'ADD_PASSWORD':
            state.password = action.payload;
            return state;
        case 'ADD_TOKEN':
            console.log('ADD_TOKEN redusers', action);
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            return state;
        case 'ADD_ACCOUNT_INFO':
            console.log('ADD_ACCOUNT_INFO redusers', action);
            return state;
        case 'ACCOUNT_INFO_LOADING':
            return { ...state, accountInfoLoading: 'inherit'};
        case 'ACCOUNT_INFO_LOADED':
            console.log('ACCOUNT_INFO redusers', action);
            return { ...state, ...action.payload, accountInfoLoading: 'none', showedStocksList: []};
        case 'SIGNIN':
            console.log('SIGNIN redusers', action);
            return state;
        case 'STOCKS_LOADED':
            return { ...state, ...action.payload};
        case 'ADD_SHOWED_STOCKS':
            return { ...state, showedStocksList: action.payload};
        case 'DONE_TRANSACTION_HISTORY':
            return { ...state, history: [action.payload]};
        default:
            return state;

    }
}

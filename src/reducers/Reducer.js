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
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            return state;
        case 'ADD_BALANCE_INFO':
            state.balance = action.payload.balance;
            state.stocks = action.payload.stocks;
            return state;
        case 'SIGNIN':
            console.log('SIGNIN redusers', action);
            return state;
        default:
            return state;

    }
}

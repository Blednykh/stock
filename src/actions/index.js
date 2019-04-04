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
export const addBalanceInfo = (data) => {
    return{
        type: 'ADD_BALANCE_INFO',
        payload: data
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

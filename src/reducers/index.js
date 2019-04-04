import {combineReducers} from 'redux';
import userInfo from './Reducer';

const appReducers = combineReducers({
    userInfo: userInfo
});
export default appReducers;

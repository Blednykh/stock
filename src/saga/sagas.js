import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import signin from '../api/signin';
import signup from '../api/signup';
function* fetchUser(action) {
    try {
        switch (action.type) {
            case 'SIGNIN':
                {
                    const tokens = yield call(signin, action.payload);
                    console.log('saga_SIGNIN', tokens);
                    yield put({type: "ADD_TOKEN", payload: tokens});
                    break;
                }
            case 'SIGNUP':
                {
                    const tokens = yield call(signup, action.payload);
                    console.log('saga_SIGNUP', tokens);
                    yield put({type: "ADD_TOKEN", payload: tokens});
                    break;
                }
        }



       // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeEvery("SIGNIN", fetchUser);
    yield takeEvery("SIGNUP", fetchUser);
}

export default mySaga;

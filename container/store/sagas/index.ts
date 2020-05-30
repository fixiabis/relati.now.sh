import { all, call } from 'redux-saga/effects'
import userSaga from './user';

function* rootSaga() {
    yield all([call(userSaga)]);
}

export default rootSaga;

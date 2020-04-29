import { takeEvery, put } from 'redux-saga/effects';
import { SAGAINIT } from './actionTypes';
import Axios from 'axios';
import { init } from './actionCreators';

function* Saga() {
    yield takeEvery(
        SAGAINIT,
        initSaga
    );
}

function* initSaga() {
    try {
        const res = yield Axios.get('/api');
        const action = init(res.data.data);
        yield put(action);
    } catch (e) {
        console.log(e);
    }
}

export default Saga;
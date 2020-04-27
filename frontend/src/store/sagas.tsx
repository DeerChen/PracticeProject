import { takeEvery, put } from 'redux-saga/effects';
import { SAGAINIT } from './actionTypes';
import axios from 'axios';
import { getSagaData } from './actionCreators';

function* Saga() {
    yield takeEvery(
        SAGAINIT,
        initSaga
    );
}

function* initSaga() {
    try {
        const res = yield axios.get('/api')
        const action = getSagaData(res);
        yield put(action);
    } catch (e) {
        console.log(e);
    }
}

export default Saga;
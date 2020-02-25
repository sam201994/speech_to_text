import {fork, all} from 'redux-saga/effects';

function* rootSaga(): Saga<void> {
  yield all([]);
}

export default rootSaga;

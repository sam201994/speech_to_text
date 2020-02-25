import {fork, all} from 'redux-saga/effects';

import HomeSaga from './screens/Home/saga';

function* rootSaga() {
  yield all([fork(HomeSaga)]);
}

export default rootSaga;

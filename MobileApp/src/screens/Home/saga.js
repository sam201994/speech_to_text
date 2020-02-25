/*
 *
 * Home Saga
 *
 */

import {put, takeLatest, all, call} from 'redux-saga/effects';
import request from '../../Utils/requests';
import Actions, {ActionTypes} from './actions';

const apiKey = 'AIzaSyDDM_hSvDBgVMUdAwdNAUNbJLPNV68YhwA';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomYoutubeId = li => {
  const index = random(0, li.length - 1);
  return li[index].id.videoId;
};

export function* handleFetchYoutubeVideo(action) {
  const {searchText, navigation} = action.payload;
  try {
    const url = `https://content.googleapis.com/youtube/v3/search?maxResults=50&part=snippet&q=${searchText}&key=${apiKey}`;
    const response = yield call(request, url);
    if (searchText && response.items && response.items.length > 0) {
      const id = getRandomYoutubeId(response.items);
      yield put(Actions.fetchYoutubeSuccess());
      navigation.navigate('video', {url: id});
    } else {
      yield put(Actions.fetchYoutubeFail());
    }
  } catch (err) {
    yield put(Actions.fetchYoutubeFail());
    throw err;
  }
}

function* HomeSaga() {
  yield all([
    yield takeLatest(
      ActionTypes.FETCH_YOUTTUBE_VIDEO_ID,
      handleFetchYoutubeVideo,
    ),
  ]);
}

export default HomeSaga;

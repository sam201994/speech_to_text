/*
 *
 * Home Actions
 *
 */

export const ActionTypes = Object.freeze({
  FETCH_YOUTTUBE_VIDEO_ID: 'app/screens/home/FETCH_YOUTTUBE_VIDEO_ID',
  FETCH_YOUTTUBE_SUCCESS: 'app/screens/home/FETCH_YOUTTUBE_SUCCESS',
  FETCH_YOUTTUBE_FAIL: 'app/screens/home/FETCH_YOUTTUBE_FAIL',
});

export function fetchYoutubeVideoId(searchText, navigation) {
  return {
    type: ActionTypes.FETCH_YOUTTUBE_VIDEO_ID,
    payload: {
      searchText,
      navigation
    },
  };
}

export function fetchYoutubeSuccess() {
  return {
    type: ActionTypes.FETCH_YOUTTUBE_SUCCESS
  };
}

export function fetchYoutubeFail() {
  return {
    type: ActionTypes.FETCH_YOUTTUBE_FAIL
  };
}

export default {
  ActionTypes,
  fetchYoutubeVideoId,
  fetchYoutubeSuccess,
  fetchYoutubeFail,
};

export const ActionTypes = Object.freeze({
  SAMPLE: 'app/screens/home/SAMPLE',
});

export function pressMeSample() {
  return {
    type: ActionTypes.SAMPLE,
    payload: {},
  };
}

export default {
  ActionTypes,
  pressMeSample,
};

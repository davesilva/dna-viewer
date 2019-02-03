export default function sequenceList(state = [], action = {}) {
  if (action.type === 'FETCH_SEQUENCE_LIST') {
    return action.data;
  }

  return state;
}

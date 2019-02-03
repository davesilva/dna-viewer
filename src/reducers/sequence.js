import _ from 'lodash';

export default function sequence(state = {}, action = {}) {
  switch (action.type) {
  case 'FETCH_SEQUENCE':
    return {
      ...state,
      nucleotideCount: action.data.nucleotides,
      annotations: action.data.annotations
    };
  case 'FETCH_NUCLEOTIDES':
    let nucleotides = state.nucleotides || {};
    if (_.keys(nucleotides).length === 10) {
      nucleotides = _.omit(state.nucleotides, _.first(_.keys(state.nucleotides)));
    }

    return {
      ...state,
      nucleotides: {
        ...nucleotides,
        [action.data.start]: action.data.nucleotides
      }
    };
  default:
    return state;
  }
}

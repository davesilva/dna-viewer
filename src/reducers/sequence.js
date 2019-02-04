import _ from 'lodash';

const annotationOverlap = (a1, a2) => {
  return ((a1.start > a2.start && a1.start < a2.end) ||
          (a1.end > a2.start && a1.end < a2.end));
};

export default function sequence(state = {}, action = {}) {
  switch (action.type) {
  case 'FETCH_SEQUENCE':
    const annotations = _.sortBy(action.data.annotations,
                                 annotation => -(annotation.end - annotation.start));
    const rows = [];
    _.each(annotations, annotation => {
      let placed = false;
      _.each(rows, (row, index) => {
        if (!placed && !_.some(row, other => annotationOverlap(annotation, other))) {
          row.push(annotation);
          placed = true;
        }
      });
      if (!placed) {
        rows.push([annotation]);
      }
    });
    return {
      ...state,
      nucleotideCount: action.data.nucleotides,
      annotations: rows
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

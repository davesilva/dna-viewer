export const fetchSequenceList = name => dispatch => {
  return fetch('/api/sequences')
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(
      response => dispatch({
        type: 'FETCH_SEQUENCE_LIST',
        data: response
      })
    );
};

export const fetchSequence = name => dispatch => {
  return fetch(`/api/sequences/${name}`)
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(
      response => dispatch({
        type: 'FETCH_SEQUENCE',
        data: response
      })
    );
};

export const fetchNucleotides = (name, start, end) => dispatch => {
  return fetch(`/api/sequences/${name}/nucleotides?start=${start}&end=${end}`)
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(
      response => dispatch({
        type: 'FETCH_NUCLEOTIDES',
        data: response
      })
    );
};

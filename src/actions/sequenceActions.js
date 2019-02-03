export const fetchSequence = name => dispatch => {
  return fetch(`/sequence/${name}`)
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
  return fetch(`/sequence/${name}/nucleotides?start=${start}&end=${end}`)
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

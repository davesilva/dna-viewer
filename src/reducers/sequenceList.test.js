import sequenceList from './sequenceList';

const defaultState = sequenceList();

describe('FETCH_SEQUENCE_LIST', () => {
  it('populates the list of sequences', () => {
    const action = {
      type: 'FETCH_SEQUENCE_LIST',
      data: ['test1', 'test2']
    };
    const next = sequenceList(defaultState, action);
    expect(next).toEqual(['test1', 'test2']);
  });
});

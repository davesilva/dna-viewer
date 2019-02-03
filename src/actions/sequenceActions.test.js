import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchSequenceList,
  fetchSequence,
  fetchNucleotides
} from './sequenceActions';

const mockStore = configureMockStore([thunk]);
window.fetch = jest.fn();

describe('fetchSequenceList', () => {
  it('dispatches FETCH_SEQUENCE_LIST after the request is complete', async () => {
    const store = mockStore();
    const json = jest.fn();
    window.fetch.mockResolvedValue({ json });
    json.mockResolvedValue([]);

    await store.dispatch(fetchSequenceList());
    expect(window.fetch).toHaveBeenCalledWith('/api/sequences');
    expect(store.getActions()[0]).toEqual({
      type: 'FETCH_SEQUENCE_LIST',
      data: []
    });
  });
});

describe('fetchSequence', () => {
  it('dispatches FETCH_SEQUENCE after the request is complete', async () => {
    const store = mockStore();
    const json = jest.fn();
    window.fetch.mockResolvedValue({ json });
    json.mockResolvedValue({});

    await store.dispatch(fetchSequence('test'));
    expect(window.fetch).toHaveBeenCalledWith('/api/sequences/test');
    expect(store.getActions()[0]).toEqual({
      type: 'FETCH_SEQUENCE',
      data: {}
    });
  });
});

describe('fetchNucleotides', () => {
  it('dispatches FETCH_NUCLEOTIDES after the request is complete', async () => {
    const store = mockStore();
    const json = jest.fn();
    window.fetch.mockResolvedValue({ json });
    json.mockResolvedValue({});

    await store.dispatch(fetchNucleotides('test', 0, 10));
    expect(window.fetch).toHaveBeenCalledWith('/api/sequences/test/nucleotides?start=0&end=10');
    expect(store.getActions()[0]).toEqual({
      type: 'FETCH_NUCLEOTIDES',
      data: {}
    });
  });
});

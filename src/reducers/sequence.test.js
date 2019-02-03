import _ from 'lodash';
import sequence from './sequence';

const defaultState = sequence();

describe('FETCH_SEQUENCE', () => {
  it('populates the nucleotide count', () => {
    const action = {
      type: 'FETCH_SEQUENCE',
      data: {
        nucleotides: 1234,
        annotations: []
      }
    };
    const next = sequence(defaultState, action);
    expect(next).toEqual({
      nucleotideCount: 1234,
      annotations: []
    });
  });
});

describe('FETCH_NUCLEOTIDES', () => {
  it('populates the nucleotide data', () => {
    const action = {
      type: 'FETCH_NUCLEOTIDES',
      data: {
        start: 0,
        end: 10,
        nucleotides: 'actggactgg'
      }
    };
    const next = sequence(defaultState, action);
    expect(next).toEqual({
      nucleotides: {
        0: 'actggactgg'
      }
    });
  });

  it('evicts old nucleotide data when full', () => {
    const initialNucleotides = {};
    _.times(10, index => initialNucleotides[index * 1000] = '');
    const action = {
      type: 'FETCH_NUCLEOTIDES',
      data: {
        start: 10000,
        end: 11000,
        nucleotides: ''
      }
    };
    const next = sequence({ nucleotides: initialNucleotides }, action);
    expect(next.nucleotides[10000]).toEqual('');
    expect(_.keys(next.nucleotides).length).toBe(10);
  });
});

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';

const mockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({ sequence: {}, sequenceList: [] });
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App pathname='/' /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('getNucleotideAtIndex', () => {
  const store = mockStore({
    sequence: {
      nucleotides: {
        0: 'g' + _.repeat('a', 999),
        1000: 't' + _.repeat('c', 999)
      }
    },
    sequenceList: []
  });
  const app = mount(
    <Provider store={store}>
      <App pathname='/' />
    </Provider>
  );
  const getNucleotideAtIndex = app.find(App).children().prop('getNucleotideAtIndex');

  it('returns the base at the given index', () => {
    expect(getNucleotideAtIndex(1)).toBe('g');
    expect(getNucleotideAtIndex(1000)).toBe('a');
    expect(getNucleotideAtIndex(1001)).toBe('t');
    expect(getNucleotideAtIndex(2000)).toBe('c');
  });

  it('returns null if given a non-existent index', () => {
    expect(getNucleotideAtIndex(0)).toBe(null);
    expect(getNucleotideAtIndex(2001)).toBe(null);
  });
});

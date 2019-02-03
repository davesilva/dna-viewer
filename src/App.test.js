import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';

const mockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({ sequence: {} });
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App pathname='/' /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

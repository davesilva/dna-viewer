import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import { fetchSequence } from './actions/sequenceActions';
import './index.css';
import App from './App';

const store = configureStore();
window.store = store;

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import { configService } from './services/configService';
import App from './app';
import appReducer from './reducers/app-reducer';
import log from 'loglevel';

// let appConfig = configService.getData();
// log.setLevel(appConfig.logLevel);

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(appReducer);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <App />
    </Provider>
  </div>,
  document.getElementById('app-container')
);

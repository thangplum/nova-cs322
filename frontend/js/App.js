import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import SentryBoundary from './utils/SentryBoundary';
import { Routes } from './routes/Routes';
import store from "./store/index";

function App() {
  return (
    <SentryBoundary>
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    </SentryBoundary>
  );
}

export default hot(App);

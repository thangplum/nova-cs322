import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import SentryBoundary from './utils/SentryBoundary';
import { Routes } from './routes/Routes';
import store from "./store/index";
import NavBar from './components/Navbar';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <SentryBoundary>
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </Provider>
    </SentryBoundary>
  );
}

export default hot(App);

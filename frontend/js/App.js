import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Calender from './pages/Calender';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route> */}
            <Route path="/calender">
              <Calender />
            </Route>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
        </div>
      </Router>
    </Provider>
  </SentryBoundary>
);

export default hot(App);

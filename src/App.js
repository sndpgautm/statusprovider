import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Layout/Header';
import Landing from './components/Layout/Landing';
import DatadogStatus from './components/DatadogStatus';
import AzureStatus from './components/AzureStatus';

//Redux Steup
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header branding="Status Provider" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/azure" component={AzureStatus} />
              <Route exact path="/datadog" component={DatadogStatus} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import TestItem from './components/TestItem';
import Tests from './components/Tests';

class App extends Component {

  render() {
    return (
      <Router>
        <Link to="/tests">tests</Link>
        <hr />
        <Switch>
          <Route path="/tests" component={Tests} />
          <Route path="/test/:testId" component={TestItem} />
        </Switch>
      </Router>
    );
  }
}

export default App;

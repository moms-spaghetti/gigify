import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '.././components/App';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      // <Route path="/signin" component={Sigin} />
    </div>
  </Router>
);

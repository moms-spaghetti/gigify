import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '.././containers/App';

const Routes = () => (
<Router>
    <div>
      <Route exact path='/' component ={App} />
    </div>
</Router>
);
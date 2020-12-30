import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Navbar from './component/Layouts/Navbar';
import Head from './component/Layouts/Head';
import About from './component/About';
import Home from './component/Home';
import Show from './component/Show';
import Page from './component/Page';

import './css/main.css';
import './css/theme.css';
import './css/type5.css';
//
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Head />
            <Route exact path='/' component={Home}/>
            <Route path="/show/:id" component={Show} />
            <Route path="/pages/:id" component={Page} />            
            <Route path='/about' component={About}/>
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

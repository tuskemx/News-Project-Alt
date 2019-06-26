import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import { Router } from '@reach/router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NC News</h1>
        <Header />
        <br></br>
        <Router>
          <ArticlesList path='/articles/*' />
          <ArticlesList path='/' />

        </Router>

      </div>
    );
  }

}

export default App;

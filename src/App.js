import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import { Router } from '@reach/router';
import * as API from './api';
import SingleArticle from './components/SingleArticle'


class App extends Component {
  state = {
    user: 'jessjelly',
    err: null,
  }
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <br></br>
        <Router>
          <ArticlesList path='/articles' />
          <ArticlesList path='/' />
          <SingleArticle path='/articles/:id' />
        </Router>

      </div>
    );
  }
  

}

export default App;

import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NC News</h1>
        <Header />
        <br></br>
        <ArticlesList />
      
      </div>
    );
  }
}

export default App;

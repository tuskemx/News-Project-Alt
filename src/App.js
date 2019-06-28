import React, { Component } from 'react';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import { Router, navigate } from '@reach/router';
import * as API from './api';
import SingleArticle from './components/SingleArticle'
import { Error } from './components/Error';
import SignupComponent from "./components/SignupComponent";
import './App.css'


class App extends Component {
  state = {
    user: 'jessjelly',
    err: null,
  }
  render() {
    const { err, user } = this.state;
    if (err !== null) {
      return <Error err={err} />
    }
    return (
      <div className="App">
        <Header user={user} />
        <br></br>
        <Router>
          <Error default />
          <ArticlesList path='/articles'/>
          <ArticlesList path='/'/>
          <SignupComponent updateAppUser={this.updateAppUser} path="/sign-up" />
          <SingleArticle path='/articles/:id' user={user} />
        </Router>

      </div>
    );
  }
  updateAppUser = (user) => {  // { user }
    this.setState({
      user: user.username
    });
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/`);
  }
}

export default App;

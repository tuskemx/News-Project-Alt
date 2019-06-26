import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import { Router } from '@reach/router';
import * as API from './api';


class App extends Component {
  state = {
    user: '',
    err: null,
  }
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <br></br>
        <Router>
          <ArticlesList path='/articles/*' />
          <ArticlesList path='/' />

        </Router>

      </div>
    );
  }
  componentDidMount() {
    const user = 'jessjelly';
    API.getUser(user).then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.username === 'jessjelly') {
        this.setState({ user: res.username }, () => {
          console.log(this.state.user)
        })
      }
    })
  }

}

export default App;

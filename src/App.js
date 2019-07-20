import React, { Component } from 'react';
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';
import { Router, navigate } from '@reach/router';
import * as API from './api';
import SingleArticle from './components/SingleArticle'
import { Error } from './components/Error';
import SignupComponent from "./components/SignupComponent";
import './App.css'
import LoginPage from './components/LoginPage';


class App extends Component {
  state = {
    user: 'jessjelly',
    err: null,
  }
  render() {
    const { user, err } = this.state;
   
    return (
      <div className="App">
        <LoginPage user={user} changeLogin={this.changeLogin} />
        <Header user={user} />

        <br></br>
        <Router>
          <ArticlesList path='/articles' />
          <ArticlesList path='/' />
          <SignupComponent updateAppUser={this.updateAppUser} path="/sign-up" />
          <SingleArticle path='/articles/:id' user={user} />
          <Error default err={err} />
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
  changeLogin = (event) => {

    if (!event) //is null set in LoginPage if current login state !== current user value 
    {
      return this.setState({ user: null })
    } else {
      API.getUser(event).then((res) => {
        if (res) {
          this.setState({
            user: res.username,
          })


        }

      }).catch((res) => {

        const errorstatus = res.response.data.status;
        const errormessage = res.message;
        const err = { errorstatus, errormessage };
        this.setState({ err: err });
      })
    }
  }
}

export default App;

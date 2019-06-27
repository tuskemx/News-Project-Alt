import React, { Component } from 'react';
import { postUser } from '../api';
import Error from './Error'


export default class SignupComponent extends Component {
  state = {
    username: null,
    name: null,
    avatar_url: null,
    err: null
  };

  render() {
    const { err } = this.state;
    if (err) {
      return <Error err={err} />;
    }
    return (
      <div >
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div class="form-row">

              <input
                required={true}
                onChange={this.updateInput}
                type="text"
                placeholder="Username"
                name="username"
              />
            </div>
          </label>
          <label>
            <div class="form-row">
              <input
                required={true}
                onChange={this.updateInput}
                type="text"
                placeholder="Avatar url"
                name="avatar_url"
              />
            </div>
          </label>
          <label>
            <div class="form-row">
              <input
                required={true}
                onChange={this.updateInput}
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>
          </label>
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
    updateInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
handleSubmit = event => {
    event.preventDefault();
    const { username, avatar_url, name } = this.state;
    const newUser = { username, name, avatar_url };
    postUser(newUser)
      .then((user) => {
        if (user) {
          this.props.updateAppUser(user.data.postedUser);
        }
      })
      .catch((res) => {
            console.dir(res, "mount err")
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err });

        })
}
}
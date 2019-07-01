import React, { Component } from 'react';
import './Login.css';
import { Error } from './Error'
import Button from 'react-bootstrap/Button';


class LoginPage extends Component {
    state = {
        userInput: '',
        err: null
    }

    render() {
        const { err } = this.state;
        if (err) {
            return <Error err={err} />;
        }
        return (
            <div id="Login">
                {!this.props.user &&
                    <form id="login-button" onSubmit={this.submitInput}>
                        <input type='text'
                            placeholder='jessjelly'
                            required={true}
                            onChange={this.updateUserInput} />
                        <button><i><b>Login</b></i></button>
                        <b>     Suggested Login: </b>   <i>jessjelly</i>


                    </form>
                }
                {this.props.user &&
                    <div id="Login">
                        <button value={null} onClick={this.submitInput}> <i><b>Logout</b></i> </button>

                    </div>
                }
            </div >
        );
    }
    updateUserInput = (event) => {
        this.setState({ userInput: event.target.value })
    }


    submitInput = (event) => {

        event.preventDefault();


        if (this.state.userInput === this.props.user) {
            return this.props.changeLogin(null);
        } else {

            return this.props.changeLogin(this.state.userInput)
        }
    }
}

export default LoginPage;
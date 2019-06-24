import React, { Component } from 'react';
import { Router } from '@reach/router';
import TopicsComponent from './TopicsComponent';
import * as API from '../api';

class Header extends Component {

    state = {
        topics: []
    }

    render() {
        return (
            <div>
                <h1>Header</h1>
                <Router>
                    <TopicsComponent topics={this.state.topics} path='/:topics' />
                </Router>
            </div>
        );
    }
    componentDidMount() {
        API.getTopics().then((res) => {
            this.setState({ topics: res })
        })
    }
}

export default Header;
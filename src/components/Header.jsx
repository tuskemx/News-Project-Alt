import React, { Component } from 'react';
import { Router } from '@reach/router';
import TopicsComponent from './TopicsComponent';
import * as API from '../api';
import TopicsCard from './TopicsCard';

class Header extends Component {

    state = {
        topics: []
    }

    render() {
        let { topics } = this.state
        return (
            <div>
                <h1>Header</h1>
                <TopicsCard topics={topics} />
                <Router>
                    <TopicsComponent topics={topics} path='/:topics' />
                </Router>
            </div>
        );
    }
    componentDidMount() {
        API.getTopics().then((res) => {
            console.log('%c TOPICS! ', 'background: #222; color: #bada55');
            this.setState({ topics: res })
        })
    }
}

export default Header;
import React, { Component } from 'react';
import * as API from '../api';
import TopicsCard from './TopicsCard';
import ArticleList from './ArticlesList'
import { Router } from '@reach/router';

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
                    <ArticleList path='/topics/:topics' />
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
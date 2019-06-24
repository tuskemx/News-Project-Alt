import React, { Component } from 'react';
import * as API from '../api';
const uuidv1 = require('uuid/v1');

class TopicsComponent extends Component {
    state = {
        articlesByTopic: []
    }
    render() {
        let { articlesByTopic } = this.state;

        console.log(this.props);
        return (
            <div>
                <h1>Topics</h1>
                <ul>
                    {articlesByTopic.length > 0 &&
                        articlesByTopic.map(article => (
                            <li key={uuidv1()} >{article.title}</li>
                        ))}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        console.log('%c Oh my heavens TOPICS COMPONENT! ', 'background: #222; color: orange');
        API.getArticles(this.props.topics).then((res) => {
            console.log(res);
            this.setState({ articlesByTopic: res })
        })

    }
    componentDidUpdate(prevProps, prevState) {
        console.log('%c Oh my heavens TOPICS COMPONENT! ', 'background: #222; color: orange');
        if (this.props.topics !== prevProps.topics) {
            API.getArticles(this.props.topics).then((res) => {
                console.log(res);
                this.setState({ articlesByTopic: res })
            })
        }

    }
}

export default TopicsComponent;
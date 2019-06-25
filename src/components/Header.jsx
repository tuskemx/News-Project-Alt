import React, { Component } from 'react';
import * as API from '../api';
import TopicsCard from './TopicsCard';
import ArticleList from './ArticlesList'
import { Router, navigate, Link } from '@reach/router';
import PostArticle from './popupboxPostArticle'

class Header extends Component {

    state = {
        topics: []
    }

    render() {
        let { topics } = this.state
        return (
            <div>
                <h1>Header</h1>

                <Link to="/"><b id="bold-title">NC NEWS HOME</b></Link>
                <TopicsCard topics={topics} />
                <Router>
                    <ArticleList path='/topics/:topics' />
                    {topics[1] &&
                        <PostArticle topics={topics} path='/postarticle' />
                    }
                </Router>
                <Link to="/postarticle"><b id="bold-title">Post Article</b></Link>

            </div>
        );
    }
    componentDidMount() {
        API.getTopics().then((res) => {
            console.log('%c TOPICS! ', 'background: #222; color: #bada55');
            console.log(res);
            this.setState({ topics: res })
        })
    }
    handleSubmit = postState => {
        const { titleInput, bodyInput, topicInput } = postState;
        const newArticle = {
            title: titleInput,
            body: bodyInput,
            topic: topicInput,
            author: 'Ghostanon'
        };
        API.postArticle(newArticle)
            .then((article) => {
                console.log(article);
                navigate(`/articles/${article.article_id}`)
            })
    }
}

export default Header;
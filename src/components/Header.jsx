import React, { Component } from 'react';
import * as API from '../api';
import TopicsCard from './TopicsCard';
import ArticleList from './ArticlesList'
import { Router, navigate, Link } from '@reach/router';
import PostArticle from './PostArticle';


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
                <Link to="/postarticle"><b id="bold-title">post article</b></Link>

                <Router>
                    <ArticleList path='/topics/:topics' />
                    <PostArticle topics={topics} path='/postarticle' handleSubmit={this.handleSubmit} />

                </Router>
                <Link to="/postarticle"><b id="bold-title">Post Article</b></Link>

            </div>
        );
    }
    componentDidMount() {
        API.getTopics().then((res) => {
            console.log('%c TOPICS! ', 'background: #222; color: #bada55');
            console.log(res);
            this.setState({ topics: res, renderPostArticle: true })
        })
    }
    handleSubmit = postState => {
        const { titleInput, bodyInput, topicInput } = postState;
        const newArticle = {
            title: titleInput,
            body: bodyInput,
            topic: topicInput,
            author: 'jessjelly'
        };
        console.log(newArticle);
        console.log(topicInput);
        API.postArticle(newArticle)
            .then((article) => {
                navigate(`/articles/${article.article_id}`)



            }).catch((err) => {
                console.dir(err);
            })
    }
}


export default Header;
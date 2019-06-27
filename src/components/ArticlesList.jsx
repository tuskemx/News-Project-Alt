import React, { Component } from 'react';
import * as API from '../api';
import ArticlesListCard from './ArticlesListCard';
import { Router } from '@reach/router';
import SingleArticle from './SingleArticle';
import SortComponent from './SortComponent';



class ArticlesList extends Component {
    state = {
        articles: [],
        err: null,
    }
    render() {
        const { articles } = this.state
        const { topics } = this.props;
        return (
            <div>
                <h1>articles</h1>
                <SortComponent SortedArticles={this.SortedArticles} propsTopic={topics} />
                <ArticlesListCard articles={articles} topic={topics} />

                }

            </div>
        );
    }
    componentDidMount() {

        API.getArticles(this.props.topics).then((res) => {
            console.log(res);
            this.setState({ articles: res })
        }).catch((err) => {
            console.log(err);
        })

    }
    componentDidUpdate(prevProps, prevState) {


        if (this.props.topics !== prevProps.topics) {
            API.getArticles(this.props.topics).then((res) => {

                this.setState({ articles: res })

            })
        }
    }
    SortedArticles = (topic, sortby) => {
        API.getArticles(topic, sortby).then((articles) => {
            console.log(articles);
            this.setState({ articles: articles })
            console.log(articles);
        }).catch((err) => {
            if (err) {
                this.setState({ err: true })
            }
        })
    }
}
export default ArticlesList;
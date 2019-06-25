import React, { Component } from 'react';
import * as API from '../api';
import ArticlesListCard from './ArticlesListCard';
import { Router } from '@reach/router';
import SingleArticle from './SingleArticle';
import SortComponent from './SortComponent';



class ArticlesList extends Component {
    state = {
        articles: []
    }
    render() {
        let { articles } = this.state
        console.log(this.props);
        return (
            <div>
                <h1>articles</h1>
                <SortComponent SortedArticles={this.SortedArticles} propsTopic={this.props.topics} />
                <Router>
                    <SingleArticle path=':id' />
                </Router>
                {this.props.topics ?
                    <ArticlesListCard articles={articles} />
                    :
                    <ArticlesListCard articles={articles} />
                }

            </div>
        );
    }
    componentDidMount() {
        const param = this.props._id ? this.props._id : this.props.topics;
        API.getArticles(param).then((res) => {
            console.log(res);
            this.setState({ articles: res })
        }).catch((err) => {
            console.log(err);
        })

    }
    componentDidUpdate(prevProps, prevState) {
        const param = this.props._id ? this.props._id : this.props.topics;

        if (param === this.props._id && param !== prevProps._id) {
            API.getArticles(param).then((res) => {

                this.setState({ articles: res })

            })

        }
        if (param === this.props.topics && param !== prevProps.topics) {
            API.getArticles(param).then((res) => {

                this.setState({ articles: res })

            })
        }
    }
    SortedArticles = (topic, sortby) => {
        API.getArticles(topic, sortby).then((articles) => {
            console.log(articles);
            this.setState({ articles: articles })
            console.log(articles);
        })
    }
}
export default ArticlesList;
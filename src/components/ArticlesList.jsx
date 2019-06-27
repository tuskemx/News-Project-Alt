import React, { Component } from 'react';
import * as API from '../api';
import ArticlesListCard from './ArticlesListCard';
import SortComponent from './SortComponent';
import { Error } from './Error'



class ArticlesList extends Component {
    state = {
        articles: [],
        err: null,
    }
    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        const { articles } = this.state
        const { topics } = this.props;
        return (
            <div>
                <h1>articles</h1>
                <SortComponent SortedArticles={this.SortedArticles} propsTopic={topics} />
                <ArticlesListCard articles={articles} topic={topics} />



            </div>
        );
    }
    componentDidMount() {

        API.getArticles(this.props.topics).then((res) => {
            console.log(res);
            this.setState({ articles: res, err: null })
        }).catch((res) => {
            console.dir(res, "mount err")
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err });

        })
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.topics !== prevProps.topics) {
            API.getArticles(this.props.topics).then((res) => {

                this.setState({ articles: res, err: null })

            }).catch((res) => {
                console.dir(res);
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err});

            })
        }

    }

    SortedArticles = (topic, sortby) => {
        API.getArticles(topic, sortby).then((articles) => {
            this.setState({ articles: articles })
        }).catch((err) => {
            this.setState({ err: err })
        })
    }
}
export default ArticlesList;
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

                }

            </div>
        );
    }
    componentDidMount() {

        API.getArticles(this.props.topics).then((res) => {
            console.log(res);
            this.setState({ articles: res })
        }).catch((res) => {
            console.log(res, "mount err")
            const errorstatus = res.status;
            const errormessage = res.data.msg;
            const err = { errorstatus, errormessage };
            this.setState({ err });

        })
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.topics !== prevProps.topics) {
            API.getArticles(this.props.topics).then((res) => {

                this.setState({ articles: res })

            }).catch((res) => {
                console.log(res, "update err");
                const errorstatus = res.status;
                console.log(errorstatus);
                const errormessage = res.data;
                console.log(errormessage, "status");
                const err = { errorstatus, errormessage };
                this.setState({ err: err, articles: [] });

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
                this.setState({ err: err, articles: [] })
            }
        })
    }
}
export default ArticlesList;
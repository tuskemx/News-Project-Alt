import React, { Component } from 'react';
import * as API from '../api';
import ArticlesListCard from './ArticlesListCard';
import SortComponent from './SortComponent';
import { Error } from './Error'



class ArticlesList extends Component {
    state = {
        articles: [],
        err: null,
        p: 1,
        button: false,
        totalcount: 0
    }
    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        const { articles } = this.state
        const { topics } = this.props;
        const maxPages = Math.ceil(this.state.totalcount / 10)
        return (
            <div>

                <SortComponent SortedArticles={this.SortedArticles} propsTopic={topics} />
                <ArticlesListCard articles={articles} topic={topics} />



                <div>
                    <button
                        disabled={this.state.p === 1}
                        onClick={() => this.changePage(-1)}
                        id="left" class="previous">Previous &laquo;>
          </button>
                    <button
                        disabled={this.state.p === maxPages}
                        onClick={() => this.changePage(1)}
                        id="right" class="next">Next &raquo;>
            </button>

                </div >




            </div>



        );
    }
    componentDidMount() {

        API.getArticles(this.props.topics, undefined, this.state.p).then((res) => {

            this.setState({ articles: res.articles, err: null, totalcount: res.totalcount })
        }).catch((res) => {

            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err });

        })
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.topics !== prevProps.topics || this.state.p !== prevState.p) {
            API.getArticles(this.props.topics, undefined, this.state.p).then((res) => {
                console.log(res);
                this.setState({ articles: res.articles, err: null, totalcount: res.totalcount })

            }).catch((res) => {
                console.dir(res);
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err });

            })
        }

    }

    SortedArticles = (topic, sortby) => {
        API.getArticles(topic, sortby, this.state.p).then((articles) => {
            console.log(articles, "sorttts");
            this.setState({ articles: articles.articles, err: null })
        }).catch((res) => {
            console.dir(res);
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })

    }
    changePage = dir => {
        this.setState(prevState => {
            return { p: this.state.p + dir }
        })
    }
}
export default ArticlesList;
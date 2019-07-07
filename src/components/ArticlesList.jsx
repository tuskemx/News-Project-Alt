import React, { Component } from 'react';
import * as API from '../api';
import SortComponent from './SortComponent';
import { Error } from './Error'
import ReactTable from 'react-table';
import 'react-table/react-table.css'; // default styling
import './table.css'; //my styling
import { ClipLoader } from "react-spinners";
import { Link } from '@reach/router';

class ArticlesList extends Component {
    state = {
        articles: [],
        err: null,
        p: 1,
        button: false,
        totalcount: 0,
        loading: true,
        columns: [
            {
                Header: (
                    <span >
                        +-
                </span>
                ),
                accessor: 'votes',
                maxWidth: 40
            },
            {
                Header: 'Article',
                accessor: 'title',
                minWidth: 300
            },
            {
                Header: 'Topic',
                accessor: 'topic'
            },
            {
                Header: 'Author',
                accessor: 'author'
            },
            {
                Header: (
                    <span >
                        ...
                </span>
                ),
                accessor: 'comment_count',
                maxWidth: 40
            },

            {
                Header: 'Date added',
                accessor: 'created_at'
            }
        ],
    }
    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }

        const { articles } = this.state
        const { topics } = this.props;
        const maxPages = Math.ceil(this.state.totalcount / 10)
        const pageNav = Array.from({ length: maxPages }, (v, i) => i + 1);
  
        const formatArticleTable = (articles) => {
            let myArticles = [];
            if (articles) {
                myArticles = articles;
            }
            return myArticles.map(article => {
                const topic = (
                    <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
                )
                const title = (
                    <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                );
                const votes = (
                    <Link to={`/articles/${article.article_id}`}>{article.votes}</Link>
                );

                const author = (
                    <Link to={`/user/`}>{article.author}</Link>
                );
                const comment_count = (
                    <Link to={`/articles/${article.article_id}`}>
                        {article.comment_count}
                    </Link>
                );
                const created_at = (
                    <Link to={`/articles/${article.article_id}`}>
                        {article.created_at.split('').slice(0, 10).join('')}
                    </Link>
                );
                return { title, topic, author, comment_count, created_at, votes };
            });
        };
        
        
        const formattedArticles = formatArticleTable(articles);
        // if (this.state.loading) {
        //     return (
        //       <div className="sweet-loading">
        //         <ClipLoader
        //           sizeUnit={"px"}
        //           size={150}
        //           color={"#123abc"}
        //           loading={this.state.loading}
        //         />
        //       </div>
        //     );
        //     }
        return (
            <div>
                

                <SortComponent SortedArticles={this.SortedArticles} propsTopic={topics} />
                <b>{this.state.p}</b>


                <div>
                    <div>
                        <ReactTable
                            data={formattedArticles}
                            columns={this.state.columns}
                            defaultPageSize={10}
                            className="-highlight -striped"
                        />
                        {/* 
                        Adding a -striped className to ReactTable will slightly color odd numbered rows for legibility
                        Adding a -highlight className to ReactTable will highlight any row as you hover over it */}
                    </div>
                    <b>Change page:</b>
                    <div>
                        <button
                            disabled={this.state.p === 1}
                            onClick={() => this.changePage(-1)}
                            >👈
          </button>
                        <button
                            disabled={this.state.p === maxPages}
                            onClick={() => this.changePage(1)}
                           >
                            👉
            </button>

                    </div >
                    <br></br>
                    <div className="pageNav">
                        {pageNav.map((page, i) => {
                            return (
                                <button key={i} onClick={() => this.changePageNumber(i + 1)}>{page}</button>
                            );
                        })}
                    </div>
                    <br></br>
                </div>

            </div >



        );
    }
    componentDidMount() {

        API.getArticles(this.props.topics, undefined, this.state.p).then((res) => {

            this.setState({ articles: res.articles, err: null, totalcount: res.totalcount, loading: false })
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

                this.setState({ articles: res.articles, err: null, totalcount: res.totalcount, loading: false })

            }).catch((res) => {

                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err });

            })
        }

    }

    SortedArticles = (topic, sortby) => {
        API.getArticles(topic, sortby, this.state.p).then((articles) => {

            this.setState({ articles: articles.articles, err: null })
        }).catch((res) => {

            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })

    }
    changePage = (dir) => {
        this.setState(prevState => (
            { p: prevState.p + dir })
        )
    }
    changePageNumber = (num) => {
        this.setState({ p: num }
        )
    }
}
export default ArticlesList;
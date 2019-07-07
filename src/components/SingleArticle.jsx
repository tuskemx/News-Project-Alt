import React, { Component } from 'react';
import * as API from '../api';
import Voter from './Voter';
import Comments from './Comments';
import { Error } from './Error'
import './articles.css';


class SingleArticle extends Component {
    state = {
        singleArticle: [],
        votes: 0,
        err: null
    }
    render() {
        const { singleArticle, votes } = this.state;
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        return (

            <div>
                {singleArticle.title &&
                    <div >
                        <div id="single-article-box">
                            <h1>{singleArticle.title}</h1>
                            <br></br>
                            <h2>{singleArticle.topic}</h2>
                            <br></br>
                            <h3>{singleArticle.body}</h3>
                            <br></br>
                            <h4>Votes: {singleArticle.votes}</h4>
                            <Voter articleLimiterVotes={votes} HandleArticleVote={this.HandleArticleVote} articleVotes={singleArticle.votes} />
                            <br></br>
                        </div>
                        <br></br>
                        <br></br>

                        <Comments article={singleArticle} user={this.props.user} id={this.props.id} />

                    </div>
                }
            </div>
        );
    }
    componentDidMount() {
        const x = localStorage.getItem('user');
        API.getArticle(this.props.id).then((article) => {
            this.setState({ singleArticle: article }, () => {
            })
        }).catch((res) => {
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.singleArticle.article_id !== prevState.singleArticle.article_id) {
            API.getArticle(this.props.id).then((article) => {
                this.setState({ singleArticle: article }, () => {

                })
            }).catch((res) => {
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err, singleArticle: [] });

            })
        }
    }
    HandleArticleVote = (direction) => {
        const { votes, singleArticle } = this.state
        const newArticleVotes = singleArticle.votes + direction;
        const articleCopy = singleArticle;
        articleCopy.votes = newArticleVotes;

        this.setState(prevState => {
            return { votes: direction + prevState.votes, singleArticle: articleCopy }
        })

        API.patchVotes(direction, this.props.id, "articles").catch((err) => {
            articleCopy.votes = newArticleVotes - direction;
            this.setState({ votes: votes - direction, singleArticle: articleCopy })
        })
    }
}


export default SingleArticle;
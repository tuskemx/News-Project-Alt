import React, { Component } from 'react';
import * as API from '../api';
import Voter from './Voter';
import Comments from './Comments';
import { Error } from './Error'

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
                    <div id="single-article-box">
                        <h1>{singleArticle.title}</h1>
                        <br></br>
                        <h2>{singleArticle.topic}</h2>
                        <br></br>
                        <h3>{singleArticle.body}</h3>
                        <br></br>
                        <h4>{singleArticle.votes}</h4>
                        <div>
                            <Voter articleLimiterVotes={votes} HandleArticleVote={this.HandleArticleVote} articleVotes={singleArticle.votes} />
                        </div>
                        <br></br>

                        <Comments article={singleArticle} user={this.props.user} />

                    </div>
                }
            </div>
        );
    }
    componentDidMount() {
        console.log(this.props.id);
        API.getArticle(this.props.id).then((article) => {
            this.setState({ singleArticle: article }, () => {
                console.log(this.state.singleArticle)
            })
        }).catch(({ res }) => {
            const errorstatus = res.status;
            const errormessage = res.data.message;
            const err = { errorstatus, errormessage };
            this.setState({ err });
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.singleArticle.article_id !== prevState.singleArticle.article_id) {
            API.getArticle(this.props.id).then((article) => {
                this.setState({ singleArticle: article }, () => {

                })
            }).catch((res) => {
                console.dir(res);
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err, singleArticle: [] });

            })
        }
    }
    HandleArticleVote = (direction) => {
        const { votes, singleArticle } = this.state
        const limiter = votes + direction;
        const newArticleVotes = singleArticle.votes + direction;
        const articleCopy = singleArticle;
        articleCopy.votes = newArticleVotes;

        this.setState({ votes: limiter, singleArticle: articleCopy })

        API.patchVotes(direction, this.props.id, "comments").catch((err) => {
            console.log(err);
            articleCopy.votes = newArticleVotes - direction;
            this.setState({ votes: votes - direction, singleArticle: articleCopy })
        })
    }
}


export default SingleArticle;
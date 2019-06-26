import React, { Component } from 'react';
import * as API from '../api';
import Voter from './Voter';
import Comments from './Comments';

class SingleArticle extends Component {
    state = {
        singleArticle: [],
        votes: 0,
        err: null
    }
    render() {
        const { singleArticle, votes } = this.state;
        console.log(singleArticle)
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
                        <Comments article={singleArticle} />

                    </div>

                }


            </div>
        );
    }
    componentDidMount() {
        console.log(this.props);
        API.getArticles(undefined, undefined, this.props.id).then((article) => {
            this.setState({ singleArticle: article }, () => {
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            API.getArticles(undefined, undefined, this.props.id).then((article) => {
                this.setState({ singleArticle: article })
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
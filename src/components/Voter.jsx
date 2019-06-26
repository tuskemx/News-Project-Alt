import React, { Component } from 'react';
import * as API from '../api';

class Voter extends Component {
    state = {
        votes: 0,
        voteChange: 0,
        err: null
    }
    render() {
        const { articleVotes, commentID, commentVotes, HandleArticleVote, articleLimiterVotes } = this.props
        const { votes, voteChange } = this.state;
        const voteArticleComment = commentVotes ? votes : articleVotes;
        const Handle = commentVotes ? this.HandleVote : HandleArticleVote;


        // const whichURL = commentVotes ? "comments" : "articles";
        return (

            <div>
                <button disabled={voteChange === 1 || articleLimiterVotes === 1} onClick={() => { Handle(1, commentID) }}>UP<br></br><b>{voteArticleComment + 1}</b></button>
                <p>{votes}</p>
                <button disabled={voteChange === -1 || articleLimiterVotes === -1} onClick={() => { Handle(-1, commentID) }}>DOWN<br></br><b>{voteArticleComment - 1}</b></button>
            </div>
        );
    }
    componentDidMount() {
        this.setState({
            votes: this.props.commentVotes,
            voteChangeArticle: this.props.articleLimiterVotes
        })

    }

    HandleVote = (direction, id) => {
        const limiter = direction + this.state.voteChange;
        this.setState(prevState => {
            return { votes: direction + prevState.votes, voteChange: limiter }
        });
        API.patchCommentVotes(direction, id, "comments").then((res) => {
            const { votes } = res.data.comment
            this.setState(prevState => {
                return { votes: votes, voteChange: prevState.voteChange }
            })
        }).catch((err) => {
            this.setState({ votes: this.state.votes - limiter, voteChange: limiter })
        })
    }

}

export default Voter;
import React, { Component } from 'react';
import * as API from '../api';

class Voter extends Component {
    state = {
        votes: 0,
        voteChange: 0
    }
    render() {
        const { articleVotes, commentID, commentVotes, HandleArticleVote } = this.props
        const { votes, voteChange } = this.state;
        const voteArticleComment = commentVotes ? votes : articleVotes;
        const Handle = commentVotes ? this.HandleVote : HandleArticleVote;


        // const whichURL = commentVotes ? "comments" : "articles";
        return (

            <div>
                <button disabled={voteChange === 1} onClick={() => { Handle(1, commentID) }}>UP<br></br><b>{voteArticleComment + 1}</b></button>
                <p>{votes}</p>
                <button disabled={voteChange === -1} onClick={() => { Handle(-1, commentID) }}>DOWN<br></br><b>{voteArticleComment - 1}</b></button>
            </div>
        );
    }
    componentDidMount() {
        this.setState({ votes: this.props.commentVotes })

    }

    HandleVote = (direction, id) => {
        const limiter = direction + this.state.voteChange;
        this.setState(prevState => {
            return { votes: direction + this.state.votes, voteChange: limiter }
        });
        console.log(limiter, "limiter");
        console.log(direction);
        console.log(this.state.Change);
        API.patchCommentVotes(direction, id).then((res) => {
            const { votes } = res.data.comment
            this.setState(prevState => {
                return { votes: votes, voteChange: limiter }
            })
        }).catch((err) => {
            this.setState({ votes: this.state.votes - limiter, voteChange: limiter })
        })
    }

}

export default Voter;
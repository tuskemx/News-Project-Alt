import React, { Component } from 'react';
import * as API from '../api';
import { Error } from './Error'
import Button from 'react-bootstrap/Button';
import './voter.css';

class Voter extends Component {
    state = {
        votes: 0,
        voteChange: 0,
        err: null
    }
    render() {
        const { commentID, commentVotes, HandleArticleVote, articleLimiterVotes } = this.props
        const { votes, voteChange } = this.state;
        const Handle = commentVotes !== undefined ? this.HandleVote : HandleArticleVote;
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }


        // const whichURL = commentVotes ? "comments" : "articles";
        return (

            <div>
                
                <button type="button" disabled={voteChange === 1 || articleLimiterVotes === 1} onClick={() => { Handle(1, commentID) }}><br></br>
                    <span class="VoteButton" role="img" aria-label="upHand">☝️</span>
                </button>
                
                

                <p>{votes}</p>
                <button type="button" disabled={voteChange === -1 || articleLimiterVotes === -1} onClick={() => { Handle(-1, commentID) }}><br></br>
                    <span class="VoteButton" role="img" aria-label="downHand">👇</span>
                </button>
             
               
                <br></br>
            </div >
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
        API.patchVotes(direction, id, "comments").then((res) => {
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
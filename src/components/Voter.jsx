import React, { Component } from 'react';

class Voter extends Component {
    // state = {
    //     votes: 0,
    ///del state?
    // }
    render() {
        let { votes, HandleVote, articleVotes } = this.props
        return (

            <div>
                <button disabled={votes === 1} onClick={() => { HandleVote(1) }}>UP<br></br><b>{articleVotes + 1}</b></button>
                <button disabled={votes === -1} onClick={() => { HandleVote(-1) }}>DOWN<br></br><b>{articleVotes - 1}</b></button>
            </div>
        );
    }
}

export default Voter;
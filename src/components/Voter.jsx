import React, { Component } from 'react';

class Voter extends Component {
    // state = {
    //     votes: 0,

    // }
    render() {
        // let { votes } = this.state;
        return (

            <div>
                <button disabled={this.props.votes === 1} onClick={() => { this.props.HandleVote(1) }}>UP<br></br><b>{this.props.articleVotes + 1}</b></button>
                <button disabled={this.props.votes === -1} onClick={() => { this.props.HandleVote(-1) }}>DOWN<br></br><b>{this.props.articleVotes - 1}</b></button>
            </div>
        );
    }
}

export default Voter;
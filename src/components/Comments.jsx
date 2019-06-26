import React, { Component } from 'react';
import * as API from '../api';
const uuidv1 = require('uuid/v1');
import Voter from './Voter';
class Comments extends Component {
    state = {
        comments: [],
        err: null,
    }
    render() {
        console.log(this.props);
        const { comments } = this.state

        console.log(comments);
        return (
            <div>
                {comments.map(comment => (
                    <ul key={uuidv1()}>
                        <li >{comment.body}</li>
                        <li>{comment.author}</li>
                        <li>{comment.created_at.split('').slice(0, 10).join('')}</li>
                        <Voter commentID={comment.comment_id} commentVotes={comment.votes} />
                    </ul>
                ))}
                <h1>END OF COMMENTS</h1>
            </div>
        );
    }
    componentDidMount() {

        API.getComments(this.props.article.article_id).then((comments) => {

            this.setState({ comments: comments })
        })
    }
    // HandleVote = (direction, id) => {
    //     const { votes, comments } = this.state
    //     const limiter = votes + direction;
    //     const newCommentVotes = comments.votes + direction;
    //     const commentsCopy = comments;
    //     var indexOfCommentinArray;
    //     commentsCopy.forEach((comment, i) => {
    //         if (comment.comment_id === id) {
    //             indexOfCommentinArray = i;

    //         }
    //     })
    //     commentsCopy[indexOfCommentinArray].votes = newCommentVotes;
    //     console.log(commentsCopy);
    //     console.log(indexOfCommentinArray, "indexofcomment")

    //     this.setState({ votes: limiter, comments: commentsCopy })

    //     API.patchCommentVotes(direction, id).catch((err) => {
    //         console.log(err);
    //         commentsCopy[indexOfCommentinArray].votes = newCommentVotes - direction;
    //         this.setState({ votes: votes - direction, comments: commentsCopy })
    //     })
    // }
}

export default Comments;
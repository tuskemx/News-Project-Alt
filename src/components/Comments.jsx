import React, { Component } from 'react';
import * as API from '../api';
import Voter from './Voter';
import { Error } from './Error'
import './comments.css';
import PostCommentComponent from './PostComment'
class Comments extends Component {
    state = {
        comments: [],
        err: null,
        button: false
    }
    render() {

        const { comments } = this.state
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }

        return (
            <div>
                <PostCommentComponent id={this.props.id}
                    user={this.props.user}
                    AddCommentState={this.AddCommentState} />
                {this.state.button &&
                    <div>
                        <h1>YOU HAVE DELETED A COMMENT </h1>
                    </div>
                }
                <div>
                    {comments.map((comment) => {

                        return (<div id="comment-card" key={comment.comment_id} >
                            <b >{comment.body}</b>
                            <br></br>
                            <b>by {comment.author}</b>
                            <br></br>
                            <b>{comment.created_at.split('').slice(0, 10).join('')}</b>
                            <Voter commentID={comment.comment_id} commentVotes={comment.votes} />
                            <div>
                                {this.props.user === comment.author &&
                                    <button variant="primary" onClick={() => { this.deleteClicked(comment.comment_id) }}>delete</button>
                                }


                            </div>
                        </div>
                        )
                    })}
                    <h1>[End of Comments...]</h1>
                </div>
            </div>
        );
    }
    componentDidMount() {

        API.getComments(this.props.article.article_id).then((comments) => {

            this.setState({ comments: comments })
        }).catch((res) => {

            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })

    }
    deleteClicked = (commentid) => {
        API.deleteItem(commentid, '/comments/').then((res) => {

            this.setState({ button: true, err: null })
        }).catch((res) => {

            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });
        })
        const filteredComments = this.state.comments.filter(comment => comment.comment_id !== commentid)
        this.setState({ comments: filteredComments, err: null })

    }
    AddCommentState = (comment) => {


        this.setState(prevState => ({

            comments: [...prevState.comments, comment]

        })
        )
    }

}



export default Comments;
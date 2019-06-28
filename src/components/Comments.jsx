import React, { Component } from 'react';
import * as API from '../api';
const uuidv1 = require('uuid/v1');
import Voter from './Voter';
import { Error } from './Error'
class Comments extends Component {
    state = {
        comments: [],
        err: null,
        button: false
    }
    render() {
        console.log(this.props);
        const { comments } = this.state
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        console.log(comments);
        return (
            <div>
                {this.state.button &&
                    <div>
                        <h1> YOU HAVE DELETED A COMMENT </h1>
                    </div>
                }
                <div>
                    {comments.map(comment => (
                        <ul key={uuidv1()}>
                            <li >{comment.body}</li>
                            <li>{comment.author}</li>
                            <li>{comment.created_at.split('').slice(0, 10).join('')}</li>
                            <Voter commentID={comment.comment_id} commentVotes={comment.votes} />
                            <div>
                                {this.props.user === comment.author &&
                                    <button variant="primary" onClick={() => { this.deleteClicked(comment.comment_id) }}>delete</button>
                                }


                            </div>
                        </ul>
                    ))}
                    <h1>END OF COMMENTS</h1>
                </div>
            </div>
        );
    }
    componentDidMount() {

        API.getComments(this.props.article.article_id).then((comments) => {

            this.setState({ comments: comments })
        })
    }
    deleteClicked = (commentid) => {
        API.deleteItem(commentid, '/comments/').then((res) => {
            console.log(res);
            this.setState({ button: true, err: null })
        }).catch((res) => {
            console.dir(res);
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })
        const filteredComments = this.state.comments.filter(comment => comment.comment_id !== commentid)
        this.setState({ comments: filteredComments, err: null })

    }
}



export default Comments;
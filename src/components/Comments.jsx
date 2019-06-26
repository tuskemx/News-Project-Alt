import React, { Component } from 'react';
import * as API from '../api';
const uuidv1 = require('uuid/v1');

class Comments extends Component {
    state = {
        comments: [],
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
}

export default Comments;
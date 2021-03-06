import React, { Component } from 'react';
import * as API from '../api'
import './comments.css';

class PostCommentComponent extends Component {

    state = {
        author: '',
        body: ''

    }

    render() {

        return (

            < div >

                {this.props.user !== null &&
                    <form onSubmit={this.submitComment} >
                        <label>
                            Comment:
              <input
                                id="comment"
                                type="text"
                                value={this.state.body}
                                onChange={this.handleChange}
                                required={true}
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form >
                }
            </div >

        );
    }
    handleChange = event => {
        this.setState({
            body: event.target.value,
            author: this.props.user
        });
        setTimeout(() => {
            console.log(this.state.author);
        }, 4 * 100);
    };
    submitComment = (event) => {
        const currentAuthor = this.props.user
        const currentBody = this.state.body;



        event.preventDefault();


        API.postComment(currentAuthor, currentBody, this.props.id).then((res) => {


            this.props.AddCommentState(res.data.comment);
        })
    }
}





export default PostCommentComponent;
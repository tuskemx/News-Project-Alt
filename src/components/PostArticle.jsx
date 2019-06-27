import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');
import { Error } from './Error'
// import {
//     PopupboxManager,
//     PopupboxContainer
// } from 'react-popupbox';



class PostArticle extends Component {
    state = {
        titleInput: null,
        bodyInput: null,
        topicInput: 'coding',
        err: null
    }
    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        return (


            <div >
                <form id="post-form"
                    onSubmit={event => {
                        event.preventDefault();
                        this.props.handleSubmit(this.state);
                    }}

                >
                    <label>
                        <div >
                            <input

                                required={true}
                                name="titleInput"
                                onChange={this.updateInputs}
                                type="text"
                                placeholder="title"
                            />
                        </div>
                    </label>
                    <br />
                    <label>
                        <div id="write-body">
                            <textarea

                                required={true}
                                name="bodyInput"
                                onChange={this.updateInputs}
                                type="text"
                                placeholder="body"
                            />
                        </div>
                    </label>
                    <br />
                    <label>
                        <select
                            required={true}
                            name="topicInput"
                            onChange={this.updateInputs}>

                            {this.props.topics.map((topic, i) => {
                                return <option key={uuidv1()}>{topic.slug}</option>
                            })}


                        </select>
                    </label>
                    <br />
                    <button>Post Article</button>
                </form>

            </div>
        )

    }

    updateInputs = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


}


export default PostArticle;
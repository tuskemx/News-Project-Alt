import React, { Component } from 'react';
import * as API from '../api';
import { navigate } from '@reach/router';
import { Error } from './Error'


class PostTopic extends Component {
    state = {
        slug: "",
        description: "",
        err: null,
        button: false
    }
    render() {
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        return (
            <div>
                <form className="form-body" onSubmit={this.handleSubmit}>
                    <label>
                        <div >
                            <input
                                required={true}
                                type="text"
                                name="slug"
                                placeholder="name"
                                onChange={this.updateStateInput}
                            />
                        </div>
                    </label>
                    <br />
                    <label>
                        <div >
                            <input
                                required={true}
                                type="text"
                                name="description"
                                placeholder="desc"
                                onChange={this.updateStateInput}
                            />
                        </div>
                    </label>
                    <button>Post Topic</button>
                </form>
                {this.state.button &&
                    <h1>thanks for posting {this.state.slug}
                    </h1>}
            </div>
        );
    }
    updateStateInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { slug, description } = this.state;
        const newTopic = { slug, description };
        API.postNewTopic(newTopic)
            .then((newTopic) => {
                const { slug } = newTopic.data.postedTopic
                console.log(slug);
                alert(`thanks for posting ${slug}`)
                navigate(`/topics/${slug}`)


            }).catch(({ res }) => {
                console.log(res);
                const errorstatus = res.status;
                const errormessage = res.data.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err, singleArticle: [] });
            })
        }
    };


export default PostTopic;
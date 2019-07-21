import React, { Component } from 'react';
import * as API from '../api';
import { navigate } from '@reach/router';
import { Error } from './Error'
import Button from 'react-bootstrap/Button';
import './Post.css'
import ArticleList from './ArticlesList'


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
                <br></br> <br></br> 
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <div >
                            <input id="write-body"
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
                            <input id="write-body"
                                required={true}
                                type="text"
                                name="description"
                                placeholder="desc"
                                onChange={this.updateStateInput}
                            />
                        </div>
                    </label>
                    <br></br>
                    <Button type="submit" >Post Topic</Button>
                </form>
                {this.state.button &&
                    <h1>thanks for posting {this.state.slug}
                    </h1>}
                    <br></br>
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                 
            </div>
        );
    }
    updateStateInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        const { slug, description } = this.state;
        const newTopic = { slug, description };
        API.postNewTopic(newTopic)
            .then((newTopic) => {
                const { slug } = newTopic.data.postedTopic
                alert(`thanks for posting ${slug}`)
                navigate(`/topics/${slug}`)


            }).catch((res) => {
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err });

            })
    }
};


export default PostTopic;
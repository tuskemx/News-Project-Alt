import React, { Component } from 'react';
import { Error } from './Error'
import Button from 'react-bootstrap/Button';
import './Post.css';
import ArticleList from './ArticlesList'


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
                <br></br>
                <form 
                    onSubmit={event => {
                        event.preventDefault();
                        this.props.handleSubmit(this.state);
                    }}

                >
                    <label>
                        <div id="write-body" >
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
                        <select id="select-topics"
                            required={true}
                            name="topicInput"
                            onChange={this.updateInputs}>

                            {this.props.topics.map((topic, i) => {
                                return <option key={i}>{topic.slug}</option>
                            })}


                        </select>
                    </label>
                    <br />
               
                    <Button type="submit" >Post Article</Button>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
                <ArticleList/>

            </div>
        )

    }

    updateInputs = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


}


export default PostArticle;
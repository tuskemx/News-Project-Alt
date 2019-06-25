import React, { Component } from 'react';
import * as API from '../api';

class SingleArticle extends Component {
    state = {
        singleArticle: []
    }
    render() {
        const { singleArticle } = this.state;
        console.log(singleArticle.article)
        console.log(this.props);
        return (
            <div>
                {singleArticle.title &&
                    <div>
                        <h1>{singleArticle.title}</h1>
                        <br></br>
                        <h2>{singleArticle.topic}</h2>
                        <br></br>
                        <h3>{singleArticle.body}</h3>
                        <br></br>

                    </div>

                }


            </div>
        );
    }
    componentDidMount() {
        console.log(this.props);
        API.getArticles(undefined, undefined, this.props.id).then((article) => {
            console.log(article, "singleArticle");
            this.setState({ singleArticle: article }, () => {
                console.log(article, "singlearticle state")
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            API.getArticles(undefined, undefined, this.props.id).then((article) => {
                console.log(article, "singlearticle")
                this.setState({ singleArticle: article })
            })
        }
    }
}


export default SingleArticle;
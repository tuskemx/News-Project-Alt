import React, { Component } from 'react';
import * as API from '../api';

class SingleArticle extends Component {
    state = {
        singleArticle: []
    }
    render() {
        const { singleArticle } = this.state;
        console.log(singleArticle.article)
        return (
            <div>
                {singleArticle.article &&
                    <div>
                        <h1>{singleArticle.article.title}</h1>
                        <br></br>
                        <h2>{singleArticle.article.topic}</h2>
                        <br></br>
                        <h3>{singleArticle.article.body}</h3>
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
            API.getArticles(undefined, undefined, this.props.id).then((res) => {
                console.log(res);
                this.setState({ singleArticle: res.data.article })
            })
        }
    }
}


export default SingleArticle;
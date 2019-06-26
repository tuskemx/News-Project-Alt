import React, { Component } from 'react';
import * as API from '../api';

class SingleArticle extends Component {
    state = {
        singleArticle: [],
        votes: 0
    }
    render() {
        const { singleArticle, votes } = this.state;
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
                        <h4>{singleArticle.votes}</h4>
                        <div>
                            <button disabled={votes === 1} onClick={() => { this.HandleVote(1) }}>UP<br></br><b>{singleArticle.votes + 1}</b></button>
                            <button disabled={votes === -1} onClick={() => { this.HandleVote(-1) }}>DOWN<br></br><b>{singleArticle.votes - 1}</b></button>
                        </div>

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
    HandleVote = (direction) => {
        const { votes, singleArticle } = this.state
        const limiter = votes + direction;
        const newArticleVotes = singleArticle.votes + direction;
        const articleCopy = singleArticle;
        articleCopy.votes = newArticleVotes;

        this.setState({ votes: limiter, singleArticle: articleCopy })

        API.patchVotes(direction, this.props.id).catch((err) => {
            console.log(err);
            API.patchVotes(-direction, this.props.id);
        })
    }
}


export default SingleArticle;
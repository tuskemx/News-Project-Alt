
import { Link } from '@reach/router';
import { Error } from './Error'
import navigatePostArticle from './functions/navigatePostArticle'
import * as API from '../api';
import React, { Component } from 'react';

class ArticlesListCard extends Component {
    render() {
        console.log(this.props.user);
        return (
            <div>
                <p>{this.props.topic}</p>
                {this.props.articles.length > 0 &&
                    this.props.articles.map(article => (
                        <ul key={article.article_id}>
                            <Link to={`/articles/${article.article_id}`}>
                                <li>{article.title}</li></Link>
                            <br></br>
                            <li>{article.votes} Votes</li>
                            <li>{article.author}</li>
                            <li>created at: {article.created_at.split('').slice(0, 10).join('')}</li>
                            {this.props.user === article.author &&
                                <button onClick={() => { this.deleteArticle(article.article_id) }}>DELETE ARTICLE</button>
                            }
                        </ul>
                    ))}
                {this.props.articles.length === 0 &&
                    <div>
                        <p>NO ARTICLES FOUND MAYBE POST ONE</p>
                        <button onClick={navigatePostArticle}>POST AN ARTICLE</button>
                    </div>
                }
            </div >

        );
    }
    deleteArticle = (articleID) => {
        API.deleteItem(articleID, '/articles/').then((res) => {
            console.log(res);
        })
    }
};

export default ArticlesListCard;

import { Link } from '@reach/router';
import navigatePostArticle from './functions/navigatePostArticle'
import React from 'react';
import './articles.css';

const ArticlesListCard = (props) => (
    <React.Fragment>
        {props.topic &&
            <b>Topic: {props.topic}</b>
        }
        <div id="banner">BANNER</div>
        {props.articles.length > 0 &&


            props.articles.map(article => (
                <div id="list-box" key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <div id="votes ">{article.votes} Votes</div>
                        <div id="title">{article.title}</div></Link>

                    <div id="author">{article.author}</div>
                    <br></br>
                    <div id="created_at">created at: {article.created_at.split('').slice(0, 10).join('')}</div>
                </div>
            ))}
        {props.articles.length === 0 &&
            <div>
                <p>NO ARTICLES FOUND MAYBE POST ONE</p>
                <button onClick={navigatePostArticle}>POST AN ARTICLE</button>
            </div>
        }
    </React.Fragment>
);


export default ArticlesListCard;

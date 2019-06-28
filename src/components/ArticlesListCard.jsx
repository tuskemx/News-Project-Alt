
import { Link } from '@reach/router';
import navigatePostArticle from './functions/navigatePostArticle'
import React from 'react';
import './articles.css';

const ArticlesListCard = (props) => (
    <React.Fragment>
        <b>Topic: {props.topic}</b>
        {props.articles.length > 0 &&

            props.articles.map(article => (
                <ul id="list-box" key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <li id="list-title">{article.title}</li></Link>
                    <br></br>
                    <li>{article.votes} Votes</li>
                    <li>{article.author}</li>
                    <li>created at: {article.created_at.split('').slice(0, 10).join('')}</li>
                </ul>
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

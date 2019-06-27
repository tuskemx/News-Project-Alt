import React from 'react';
const uuidv1 = require('uuid/v1');
import { Link, navigate } from '@reach/router';
import navigatePostArticle from './functions/navigatePostArticle'


const ArticlesListCard = (props) => {

    return (
        <div>
            <p>{props.topic}</p>
            {props.articles.length > 0 && props.articles[0].topic === props.topic &&
                props.articles.map(article => (
                    <ul key={uuidv1()}>
                        <Link to={`/articles/${article.article_id}`}>
                            <li>{article.title}</li></Link>
                        <br></br>
                        <li>{article.votes} Votes</li>
                        <li>{article.author}</li>
                        <li>created at: {article.created_at.split('').slice(0, 10).join('')}</li>
                    </ul>

                ))}
            {props.articles.length === 0 &&
                <p>NO ARTICLES FOUND MAYBE POST ONE</p>}
            <button onClick={navigatePostArticle}>POST AN ARTICLE</button>
        </div >
    );


};

export default ArticlesListCard;
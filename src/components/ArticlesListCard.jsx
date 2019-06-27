import React from 'react';
import { Link, navigate } from '@reach/router';
import navigatePostArticle from './functions/navigatePostArticle'



const ArticlesListCard = (props) => {

    return (
        <div>
            <p>{props.topic}</p>
            
            {props.articles.map(article => (
                <ul key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <li>{article.title}</li></Link>
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
        </div >
    );


};

export default ArticlesListCard;
import React from 'react';
import { Link } from '@reach/router';
import { Error } from './Error'
import navigatePostArticle from './functions/navigatePostArticle'
import * as API from '../api';

 

const ArticlesListCard = (props) => {
     
    
    
    return (
        <div>
            <p>{props.topic}</p>
           {props.articles.length > 0 &&
            props.articles.map(article => (
                <ul key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <li>{article.title}</li></Link>
                    <br></br>
                    <li>{article.votes} Votes</li>
                    <li>{article.author}</li>
                    <li>created at: {article.created_at.split('').slice(0, 10).join('')}</li>
                     <button onClick={() => {props.deleteArticle(article.article_id)}}>BUTTON DELETE TEST</button>
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
  deleteArticle = (articleID) => {
      API.deleteArticle(articleID).then((res) => {
        console.log(res);
      })
    }
};

export default ArticlesListCard;
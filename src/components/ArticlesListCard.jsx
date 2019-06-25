import React from 'react';
const uuidv1 = require('uuid/v1');
import { Link } from '@reach/router';

const ArticlesListCard = (props) => {
    return (
        <div>
            {props.articles.length > 0 &&
                props.articles.map(article => (
                    <ul key={uuidv1()}>
                        <Link to={`/ ${article.article_id}`}>
                            <li>{article.title}</li></Link>
                        <br></br>
                        <li>{article.votes} Votes</li>
                        <li>{article.author}</li>
                        <li>created at: {article.created_at.split('').slice(0, 10).join('')}</li>
                    </ul>

                ))}
        </div>
    );
};

export default ArticlesListCard;
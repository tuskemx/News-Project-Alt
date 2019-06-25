import React from 'react';
import { Link } from '@reach/router'
const uuidv1 = require('uuid/v1');


const TopicsCard = (props) => {

    return (
        <ul>
            {props.topics.map((topic) => {
                return <Link key={uuidv1()} to={`/topics/${topic.slug}`}>
                    <li key={uuidv1()}>
                        {topic.slug}
                    </li>
                </Link>

            })}
        </ul>
    );
};

export default TopicsCard;
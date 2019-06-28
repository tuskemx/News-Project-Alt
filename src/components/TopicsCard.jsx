import React from 'react';
import { Link } from '@reach/router'
import './topics.css'


const TopicsCard = (props) => (


    <ul>
        {props.topics.map((topic) => {
            return <Link id='topics-title' key={topic.slug} to={`/topics/${topic.slug}`}>
                <b key={topic.slug}>
                    [{topic.slug}]
                </b>
              
            </Link>

        })}
    </ul>
);


export default TopicsCard;
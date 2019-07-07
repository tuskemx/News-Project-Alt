import React, { Component } from 'react';
import TopicsCard from './TopicsCard';
import ArticleList from './ArticlesList'
import { Router, navigate, Link } from '@reach/router';
import PostArticle from './PostArticle';
import User from './User';
import PostTopic from './PostTopic';
import * as API from '../api';
import { Error } from './Error'
import './Header.css';

class Header extends Component {

    state = {
        topics: [],
        err: null,
    }

    render() {
        let { topics } = this.state
        const { err } = this.state;
        if (err !== null) {
            return <Error err={err} />
        }
        const { user } = this.props
        return (
            <div><b>You are logged in as {user}</b>
                <TopicsCard topics={topics} />

                <Link to="/"><b id="bold-title">[Bel-Air News]</b></Link>
                <br></br>

                {user &&
                    <Link to="/user"><b>[User Page] </b></Link>
                }
                <br></br>
                {!user &&
                    <Link to="sign-up"><b id="bold-title">[sign up]</b></Link>
                }
                <br></br>
                {user &&
                    <Link to="/postarticle"><b id="bold-title">[post article]</b></Link>
                }

                <br></br>
                {user &&
                    <Link to="/posttopic"><b id="post-topic">[post topic]</b></Link>
                }


                <br>
                </br>

                <Router>
                    {user &&
                        <User path='/user' user={user} />
                    }
                    {user &&
                        <PostArticle topics={topics} path='/postarticle' handleSubmit={this.handleSubmit} />
                    }
                    {user &&
                        <PostTopic path='/posttopic' />
                    }


                    <ArticleList path='/topics/:topics' user={user} />


                </Router>
                <br></br>


            </div>
        );
    }
    componentDidMount() {
        API.getTopics().then((res) => {
            console.log('%c TOPICS! ', 'background: #222; color: #bada55');
            this.setState({ topics: res, renderPostArticle: true })
        }).catch((res) => {
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err });

        })

    }
    handleSubmit = postState => {
        const { titleInput, bodyInput, topicInput } = postState;
        const newArticle = {
            title: titleInput,
            body: bodyInput,
            topic: topicInput,
            author: this.props.user
        };

        API.postArticle(newArticle)
            .then((article) => {
                navigate(`/articles/${article.article_id}`)
            }).catch((res) => {
                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err });

            })

    }
}


export default Header;
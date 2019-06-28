import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as API from '../api'
const uuidv1 = require('uuid/v1');
import { Error } from './Error'


class User extends Component {
    state = {
        articlesByUser: [],
        avatar_url: '',
        name: '',
        username: '',
        err: null
    }
    render() {
        const { user } = this.props;
        const { articlesByUser, avatar_url, name, username, err } = this.state;
        console.log(user);

        if (err !== null) {
            return <Error err={err} />
        }



        return (
            <div>
                <br></br>

                <b>{name}</b>
                <br></br>
                <b>{username}</b>
                <br></br>
                <img src={{ avatar_url }} width="50" height="50" alt="avatar"></img>
                <b>Articles By user:</b>

                <div>
                    {articlesByUser.map(article => (
                        <div>
                            <Link key={uuidv1()} to={`/articles/${article.article_id}`}>
                                <b>{article.title}</b>
                                <br></br>
                            </Link>
                            {user === article.author &&
                                <button onClick={() => { this.deleteArticle(article.article_id) }}>DELETE ARTICLE</button>
                            }
                        </div>

                    )

                    )}
                </div>


            </div>
        );
    }
    componentDidMount() {
        const { user } = this.props;
        Promise.all([API.getArticles(undefined, undefined, undefined, user), API.getUser(user)]).then((res) => {
            const articles = res[0].articles ? res[0].articles : [];
            this.setState({
                articlesByUser: articles,
                avatar_url: res[1].avatar_url,
                username: res[1].username,
                name: res[1].name
            })
        }).catch((res) => {
            console.dir(res);
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })


    }
    deleteArticle = (articleID) => {
        API.deleteItem(articleID, '/articles/').then((res) => {
            console.log(res);
        }).catch((res) => {
            console.dir(res);
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })

    }
}


export default User;
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

                <b>{name}</b>
                <br></br>
                <b>{username}</b>
                <br></br>
                <img src={{ avatar_url }} width="50" height="50" alt="avatar"></img>
                <b>Articles By user:</b>

                <div>
                    {articlesByUser.map(article => (
                        <Link key={uuidv1()} to={`/articles/${article.article_id}`}>
                            <b>{article.title}</b>
                            <br></br>
                        </Link>

                    )

                    )}
                </div>


            </div>
        );
    }
    componentDidMount() {
        const { user } = this.props;
        Promise.all([API.getArticlesByUser(user), API.getUser(user)]).then((res) => {
            console.log(res);


            const { articles } = res[0].data;
            const { avatar_url, username, name } = res[1];

            this.setState({
                articlesByUser: articles,
                avatar_url: avatar_url,
                username: username,
                name: name
            })
        }).catch(({ res }) => {
            console.log(res);
            const errorstatus = res.status;
            const errormessage = res.data.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })


    }
}


export default User;
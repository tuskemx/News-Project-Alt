import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as API from '../api'
import { Error } from './Error'
import Button from 'react-bootstrap/Button';


class User extends Component {
    state = {
        articlesByUser: [],
        avatar_url: '',
        name: '',
        username: '',
        err: null,
    }
    render() {
        const { user } = this.props;
        const { articlesByUser, avatar_url, name, username, err } = this.state;
        console.log(this.props, "chick");

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
                <img src={avatar_url} width="50" height="50" alt="avatar"></img>
                <br></br>
                <b>Articles By user:</b>

                <div>
                    {articlesByUser.map(article => (
                        <div>
                            <Link key={article.article_id} to={`/articles/${article.article_id}`}>
                                <b>{article.title}</b>
                                <br></br>
                            </Link>
                            {user === article.author &&
                                <Button onClick={() => { this.deleteArticle(article.article_id) }}>DELETE ARTICLE</Button>
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

            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })


    }
    componentDidUpdate(prevProps, prevState) {
        const { user } = this.props;
        if (this.state.articlesByUser.length !== prevState.articlesByUser.length) {
            Promise.all([API.getArticles(undefined, undefined, undefined, user), API.getUser(user)]).then((res) => {
                const articles = res[0].articles ? res[0].articles : [];
                this.setState({
                    articlesByUser: articles,
                    avatar_url: res[1].avatar_url,
                    username: res[1].username,
                    name: res[1].name
                })
            }).catch((res) => {

                const errorstatus = res.response.data.status;
                const errormessage = res.message;
                const err = { errorstatus, errormessage };
                this.setState({ err: err });

            })
        }


    }
    deleteArticle = (articleID) => {
        API.deleteItem(articleID, '/articles/').then((res) => {
            Promise.all([API.getArticles(undefined, undefined, undefined, this.props.user), API.getUser(this.props.user)]).then((res) => {
                const articles = res[0].articles ? res[0].articles : [];
                this.setState({
                    articlesByUser: articles,
                    avatar_url: res[1].avatar_url,
                    username: res[1].username,
                    name: res[1].name
                })
            })
        }).catch((res) => {
            const errorstatus = res.response.data.status;
            const errormessage = res.message;
            const err = { errorstatus, errormessage };
            this.setState({ err: err });

        })

    }
}


export default User;
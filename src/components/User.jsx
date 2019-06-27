import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as API from '../api'
const uuidv1 = require('uuid/v1');


class User extends Component {
    state = {
        user: this.props.user,
        articlesByUser: [],
    }
    render() {
        const { user } = this.props;
        const { articlesByUser } = this.state;
        const arrUser = user[0]
        console.log(arrUser);


        return (
            <div>

                <b>{arrUser}</b>
                <b>{arrUser}</b>
                <br></br>
                <br></br>
                <img src={arrUser} width="50" height="50" alt="avatar"></img>
                <br></br>
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
        const { user } = this.state;
        API.getArticlesByUser(user).then((res) => {
            const { articles } = res.data;
            this.setState({
                articlesByUser: articles,
            })

        })
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.articlesByUser[0].length !== prevState.articlesUser[0].length) {
    //         API.getArticlesByUser(this.state.user).then((res) => {
    //             this.setState({
    //                 articlesByUser: res.data.articles,
    //             })

    //         })
    //     }
}


export default User;
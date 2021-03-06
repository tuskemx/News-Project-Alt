import axios from 'axios';

const request = axios.create({
    baseURL: `https://mynewsapp-matthew.herokuapp.com/api`
});

export const getTopics = () => {
    return request.get(`/topics`).then((res) => {
        let { topics } = res.data;
        return topics;
    })

}

export const getArticles = (topic, sort_by, p, author) => {

    return request.get(`/articles`, { params: { topic: topic, sort_by: sort_by, p: p, author: author } }).then((res) => {
        if (res.data.articles) {
            const { articles, totalcount } = res.data;
            return { articles, totalcount }
        }
        if (res.data.article) {
            const { article } = res.data
            return article;
        }
        return res;
    })
}

export const postArticle = newArticle => {
    return request
        .post(`/articles`, newArticle)
        .then((res) => {
            const { article } = res.data
            return article;
        });
};

export const patchVotes = (direction, id, changeURL) => {
    return request.patch(`${changeURL}/${id}`, ({ inc_votes: direction })).then((res) => {
        return res
    })
}


export const getComments = (id) => {


    return request.get(`/articles/${id}/comments`).then((res) => {
        const { comments } = res.data;
        return comments;
    });
}

export const getUser = (specificUser) => {
    return request.get(`users/${specificUser}`).then(({ data: { user } }) => {
        return user
    })

}

export const postNewTopic = newTopic => {
    console.log(newTopic);
    return request
        .post(`/topics`, newTopic)

        .then((newTopic) => {
            return newTopic;
        });
};



export const getArticle = (id) => {

    return request.get(`/articles/${id}`).then((res) => {
        const { article } = res.data;

        return article;
    });
}

export const deleteItem = (id, identifier) => {

    return request.delete(`${identifier}${id}`).then((res) => {

        return res
    })
}

export const postUser = newUser => {
    return request.post(`/users`, newUser).then((user) => {

        return user;
    })
};

export const postComment = (currentAuthor, currentBody, id) => {

    return request.post(`/articles/${id}/comments`, { author: currentAuthor, body: currentBody })
        .then((res) => {

            return res
        })
}




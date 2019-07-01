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
    console.log(topic);
    return request.get(`/articles`, { params: { topic: topic, sort_by: sort_by, p: p, author: author } }).then((res) => {
        console.dir(res);
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
    console.log(id);

    return request.get(`/articles/${id}/comments`).then((res) => {
        const { comments } = res.data;
        return comments;
    });
}

export const getUser = (specificUser) => {
    return request.get(`users/${specificUser}`).then(({ data: { user } }) => {
        console.log(user);
        return user
    })

}

export const postNewTopic = newTopic => {
    return request
        .post(`/topics`, newTopic)

        .then((newTopic) => {
            return newTopic;
        });
};



export const getArticle = (id) => {

    return request.get(`/articles/${id}`).then((res) => {
        const { article } = res.data;
        console.log(res);
        return article;
    });
}

export const deleteItem = (id, identifier) => {
    console.log(id, "ID API");
    console.log(identifier, "IDENTIFIER")
    return request.delete(`${identifier}${id}`).then((res) => {
        console.log(res);
        console.dir(res);
        return res
    })
}

export const postUser = newUser => {
    console.log(newUser);
    return request.post(`/users`, newUser).then((user) => {
        console.log(user);
        return user;
    })
};

export const postComment = (currentAuthor, currentBody, id) => {
    console.log(currentAuthor);
    console.log(currentBody);
    console.log(id);
    return request.post(`/articles/${id}/comments`, { author: currentAuthor, body: currentBody })
        .then((res) => {

            return res
        })
}




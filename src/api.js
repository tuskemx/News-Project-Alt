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

export const getArticles = (topic, sortby, id) => {
    const theid = id ? `/${id}` : ''
    return request.get(`/articles${theid}`, { params: { topic: topic, sort_by: sortby } }).then((res) => {
        if (res.data.articles) {
            const { articles } = res.data;
            return articles
        }
        const { article } = res.data
        return article;

    });
}

export const postArticle = newArticle => {
    console.log(newArticle);
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

        return user
    })

}

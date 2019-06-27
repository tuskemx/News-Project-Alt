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

export const getArticles = (topic, sortby, p) => {

    return request.get(`/articles`, { params: { topic: topic, sort_by: sortby, p: p } }).then((res) => {
       
        if (res.data.articles) {
            const { articles, totalcount } = res.data;
            

            return {articles, totalcount}
        }
        if (res.data.article){

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

export const getArticlesByUser = username => {
    //maybe merge with getarticles
    return request
        .get(`/articles?author=${username}`)
        .then((data) => {
            console.log(data);
            return data;
        });
};

export const getArticle = (id) => {

    return request.get(`/articles/${id}`).then((res) => {
        const { article } = res.data;
        console.log(res);
        return article;
    });
}
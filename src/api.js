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

export const getArticles = (topic, sortby, p, username) => {
console.log(username);
    return request.get(`/articles`, { params: { topic: topic, sort_by: sortby, p: p, author: username  } }).then((res) => {
       console.dir(res);
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

export const deleteComment = (commentid) => {
    return request.delete(`/comments/${commentid}`).then((res) => {

        return res
    })
}
export const deleteArticle = (articleID) => {
    return request.delete(`/articles/${articleID}`).then((res) => {
      console.log(res);
        return res
    })
}



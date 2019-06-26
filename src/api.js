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

            console.log(article)

            return article;



        });
};

export const patchVotes = (direction, id) => {
    return request.patch(`/articles/${id}`, ({ inc_votes: direction })).then((res) => {


        return res
    })
}




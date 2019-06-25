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
            var { articles } = res.data;
        }
        if (res.data.article) {
            articles = res.data
        }
        return articles;
    });
}


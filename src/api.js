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

    console.log(theid, 'apiid');
    console.log(topic, 'topicapi');
    console.log(sortby, 'sortby api');
    return request.get(`/articles${theid}`, { params: { topic: topic, sort_by: sortby } }).then((res) => {
        if (res.data.articles) {
            const { articles } = res.data;
            return articles
        }
        const { article } = res.data
        return article;

    });
}


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

export const getArticles = (input) => {
    
    return request.get(`/articles`, { params: { topic: input } }).then((res) => {
        let { articles } = res.data;
        console.log(articles, 'API');
        console.log('input')
        return articles;
    });
}
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
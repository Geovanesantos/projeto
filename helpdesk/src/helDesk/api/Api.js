import axios from 'axios';

const apiUrl = 'http://10.0.11.149:9000'
const api = axios.create({
    baseURL: apiUrl
})

export default api
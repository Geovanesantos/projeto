import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.0.11.110:9000/',
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true
  });
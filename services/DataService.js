import config from '../config.js';
import axios from 'axios';

const api_url = `${config.API_PROTOCOL}://${config.API_HOST}/${config.API_ENDPOINT}`;

const instance = axios.create({
  baseURL: api_url,
  headers: {'Content-Type': 'application/json', Authorization: config.API_SECRET},
  httpsAgent: {}
});

module.exports = {
  getSongs: (limit) => {
    if(!limit) {
      limit = {
        start: 0,
        end: 30
      };
    }
    return instance.get('/songs/limit?start=' + limit.start + '&end=' + limit.end).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  },

  getSong: (id) => {
    return instance.get('/songs/' + id).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  },
};

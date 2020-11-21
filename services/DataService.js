import config from '../config.js';
const api_url = `${config.API_PROTOCOL}://${config.API_HOST}:${config.API_PORT}/${config.API_ENDPOINT}`;

module.exports = {
  getAllSongs: () => {
    return fetch(api_url + '/songs', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': config.API_SECRET,
      },
    }).then((res) => res.json());
  },
};

import config from '../config.js';

import RNFetchBlob from 'react-native-fetch-blob';


const api_url = `${config.API_PROTOCOL}://${config.API_HOST}/${config.API_ENDPOINT}`;

module.exports = {
  getSongs: (limit) => {

    // default number for getSongs()
    if (!limit) {
      limit = {};
      limit.start = 0;
      limit.end = 30;
    }
    return RNFetchBlob.config({trusty: true}).fetch('GET', api_url + `/songs/limit?start=${limit.start}&end=${limit.end}`, {
      Authorization: config.API_SECRET,
    }).then((res) => res.json());
  },
};

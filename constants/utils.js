import config from '../config';

export default {
  concatArtists: (song) => {
    let str = "";
    song.artists.forEach((artist, i) => {
      i < song.artists.length - 1 ? str += artist.name + ", " : str += artist.name;
    });
    return str;
  },
  apiUrl: `${config.API_PROTOCOL}://${config.API_HOST}/${config.API_ENDPOINT}`
};

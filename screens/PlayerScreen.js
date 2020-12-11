import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import utils from '../constants/utils';
import TrackPlayer from 'react-native-track-player';
import config from '../config';

const stream_url = `${config.API_PROTOCOL}://${config.API_HOST}/stream/`;

const PlayerScreen = ({route}) => {

  const { itemId } = route.params;
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);

  const trackPlayerInit =  () => {
    return TrackPlayer.setupPlayer().then((res) => {
      console.log('setup player', res);
        TrackPlayer.add({
          headers: {'Authorization': config.API_SECRET},
          id: 1,
          url: stream_url + song.filename,
          type: 'default',
          title: song.title,
          album: song.albums[0].title,
          artist: utils.concatArtists(song),
          artwork: song.albums[0].imageUrl,
        }).then(() => {
          TrackPlayer.play();
        });
      }).catch((e) => console.error(e));
  };

  const componentDidMount = () => {
    console.log('did mount');
    dataService.getSong(itemId).then((result) => {
      console.log(result);
      setSong(result);
      trackPlayerInit().then(() => {
        setLoading(false);
        TrackPlayer.play();
      });
    }).catch((e) => console.error(e));
  };

  const componentWillUnmount = () => {
    setSong({});
    setLoading(true);
  };

  useEffect(() => {
    console.log('use effect fired');
    componentDidMount();
    return (
      componentWillUnmount()
    );
  }, []);

  if (!loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtists}>{utils.concatArtists(song)}</Text>
        <Image source={{uri: song.albums[0].imageUrl}} style={styles.albumImage} />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
};

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 28,
    fontWeight: 'normal',
  },
  songArtists: {
    marginBottom: 18,
    fontSize: 20,
    fontWeight: 'normal',
  },
  itemHeader: {
    fontSize: 15,
  },
  albumImage: {
    backgroundColor: 'transparent',
    height: 300,
    width: 300
  }
});

export default PlayerScreen;

import * as React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import utils from '../constants/utils';
import TrackPlayer from 'react-native-track-player';
import config from '../config';

const stream_url = `${config.API_PROTOCOL}://${config.API_HOST}/stream/`;

export default class PlayerScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      song: {},
      loading: true
    };
  }

  trackPlayerInit() {
    const { song } = this.state;
    if(song.filename) {
      return TrackPlayer.setupPlayer().then(() => {
        console.log('setup player', stream_url + song.filename);
        return TrackPlayer.add({
          headers: {'Authorization': config.API_SECRET},
          id: song.id.toString(),
          url: stream_url + song.filename,
          type: 'default',
          title: song.title,
          album: song.albums[0].title,
          artist: utils.concatArtists(song),
          artwork: song.albums[0].imageUrl,
        }).catch((e) => console.error(e));
      });
    }
  }

  afterInit() {
    //TrackPlayer.play();
  }

  componentDidMount() {
    const { route } = this.props;
    const { itemId } = route.params;
    return dataService.getSong(itemId).then((result) => {
      this.setState({song: result});
      return this.trackPlayerInit().then(() => {
        this.setState({loading: false});
        console.log("song added");
        return this.afterInit();
      });
    }).catch((e) => console.error(e));
  }

  componentWillUnmount() {
    console.log('player will unmount');
    this.setState({song: {}, loading: true});
  }

  render() {
    const {song, loading} = this.state;
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
  }

}

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

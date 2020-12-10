import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import utils from '../constants/utils';

const PlayerScreen = ({route}) => {

  const { itemId } = route.params;
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(true);

  const componentDidMount = () => {
    console.log('did mount');
    dataService.getSong(itemId).then((result) => {
      setSong(result);
      setLoading(false);
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

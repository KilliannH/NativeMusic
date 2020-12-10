//import React form react
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

import utils from '../constants/utils';

const SongCard = ({song, navigation}) => {

  // todo -- impl when there is more than one album like render multiple albums...
  let getAlbums = () => {
    if(song.albums.length <= 1) {
      return <Image source={{uri: song.albums[0].imageUrl}} style={styles.albumImage}/>;
    }
  };

  return (
  <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={() => navigation.navigate('Player', { itemId: song.id }) }>
    <View style={styles.listItemContainer}>
      {getAlbums()}
      <View style={styles.songInfos}>
        <Text>{utils.concatArtists(song)}</Text>
        <Text style={styles.itemHeader}>{song.title}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(40, 40, 40, .1)'
  },
  songInfos: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  itemHeader: {
    fontSize: 15,
  },
  albumImage: {
    backgroundColor: 'transparent',
    height: 50,
    width: 50
  }
});

export default SongCard;

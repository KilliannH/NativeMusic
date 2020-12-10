//import React form react
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

const SongCard = ({song, navigation}) => {
  return (
  <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={() => navigation.navigate('Player', song._id)}>
    <View style={styles.listItemContainer}>
      <Image source={{uri: song.album_img}} style={styles.albumImage}/>
      <View style={styles.songInfos}>
        <Text>{song.artist}</Text>
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

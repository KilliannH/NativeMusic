import React, {PureComponent} from 'react';

import { View,Image,  FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as dataService from '../services/DataService';
import SongCard from './songCard';

export default class Playlist extends React.PureComponent {
  // define a state for your component

  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log('did mount');
      dataService.getAllSongs().then((songs) => {
        this.setState({songList: songs, loading: false});
      }).catch((e) => console.error(e));
  }

  componentWillUnmount() {
    this.setState({songList: [], loading: true});
  }

  render() {
    //Destruct songList and Loading from state.
    const { songList, loading } = this.state;
    const { navigation } = this.props;
    //If laoding to false, return a FlatList which will have data, renderItem, and keyExtractor props used.
    //Data contains the data being  mapped over.
    //RenderItem a callback return UI for each item.
    //keyExtractor used to give a unique identifier for each item.
    if(!loading) {
      return <FlatList
        data={songList}
        renderItem={(data) => <SongCard song={data.item} navigation={navigation} />}
        keyExtractor={(item) => item._id}
      />;
    } else {
      return <ActivityIndicator />;
    }
  }
}

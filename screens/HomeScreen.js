import * as React from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import SongCard from '../components/songCard';

import globalStyles from '../constants/globalStyles';

export default class HomeScreen extends React.Component {

  state = {
    songList: [],
    loading: true
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
    const {songList, loading} = this.state;
    const {navigation} = this.props;
    //If laoding to false, return a FlatList which will have data, renderItem, and keyExtractor props used.
    //Data contains the data being  mapped over.
    //RenderItem a callback return UI for each item.
    //keyExtractor used to give a unique identifier for each item.
    if (!loading) {
      return (
        <>
          <View style={{
            flexDirection: "row",
            height: 80,
            padding: 20,
          }}>
            <Text style={globalStyles.titleText}>All Songs</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
            <FlatList
              data={songList}
              renderItem={(data) => <SongCard song={data.item} navigation={navigation} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}

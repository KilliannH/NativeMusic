import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import SongCard from '../components/songCard';

import globalStyles from '../constants/globalStyles';

const HomeScreen = ({navigation}) => {

  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);

  const componentDidMount = () => {
    console.log('did mount');
    dataService.getAllSongs().then((songs) => {
      setSongList(songs);
      setLoading(false);
    }).catch((e) => console.error(e));
  };

  const componentWillUnmount = () => {
    setSongList([]);
    setLoading(true);
  };

  useEffect(() => {
    console.log('use effect fired');
    componentDidMount();
    return (
      componentWillUnmount()
    );
  }, []);
  // if homeScreen were a nested Component and soundlist (the datasource) were a property of that component
  // we would added [songList] as a dependancy to tell React that we want to fire this hook only of songList had changed.

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
};

export default HomeScreen;

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
    dataService.getSongs().then((result) => {
      setSongList(result.content);
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
  // we would added [songList] as a dependency to tell React that we want to fire this hook only if songList had changed.

  // here songList is not a property of our component so we don't have to specify it as a dependency
  // + an empty array is the appropriate behavior to retrieve the componentDidMount / componentWillUnmount paradigm of a class based component.

  if (!loading) {
    return (
      <>
        <View style={{
          flexDirection: "row",
          height: 65,
          paddingTop: 20,
          paddingLeft: 20
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
            keyExtractor={(item) => item.title}
          />
        </View>
      </>
    );
  } else {
    return <ActivityIndicator />;
  }
};

export default HomeScreen;

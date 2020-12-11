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
    });
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

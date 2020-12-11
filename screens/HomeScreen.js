import * as React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import SongCard from '../components/songCard';

import globalStyles from '../constants/globalStyles';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log('homeScreen did mount');
    return dataService.getSongs().then((result) => {
      this.setState({songList: result.content, loading: false});
    }).catch((e) => console.error(e));
  }

  componentWillUnmount() {
    console.log('homeScreen will unmount');
    this.setState({songList: [], loading: true});
  }

  render() {
    //Destruct songList and Loading from state.
    const {songList, loading} = this.state;
    const {navigation} = this.props;
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
  }

}

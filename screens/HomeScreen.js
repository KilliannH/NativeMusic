import * as React from 'react';
import { View, Text, Button } from 'react-native';
import * as dataService from '../services/DataService';

import globalStyles from '../constants/globalStyles';
import Playlist from '../components/Playlist';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
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
          <Playlist />
        </View>
      </>
    );
  }
}

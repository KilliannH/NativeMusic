import * as React from 'react';
import { View, Text, Button } from 'react-native';
import * as dataService from '../services/DataService';

import globalStyles from '../constants/globalStyles';

export default class PlayerScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
          <Text style={globalStyles.titleText}>All Songs</Text>
      </>
    );
  }
}

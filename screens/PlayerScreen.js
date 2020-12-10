import React from 'react';
import { Text } from 'react-native';
import * as dataService from '../services/DataService';

import globalStyles from '../constants/globalStyles';

const PlayerScreen = () => {

  return (
    <>
      <Text style={globalStyles.titleText}>All Songs</Text>
    </>
  );
};

export default PlayerScreen;

import React from 'react';
import { View } from 'react-native';
import Earnings from './Earnings';
import CurrentLineups from './CurrentLineups';

const MyLineups = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Earnings />
      <View style={{ flex: 1 }}>
        <CurrentLineups />
      </View>
    </View>
  );
};

export default MyLineups;

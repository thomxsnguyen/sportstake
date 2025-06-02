import React from 'react';
import { ScrollView } from 'react-native';
import Earnings from './Earnings';
import CurrentLineups from './CurrentLineups';

const MyLineups = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <Earnings />
      <CurrentLineups />
    </ScrollView>
  );
};

export default MyLineups;

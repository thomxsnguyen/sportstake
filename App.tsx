import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text } from 'react-native';
import CreateSreen from './components/CreatePage';
import BottomTabBar from 'components/NavigateBar';
import Header from 'components/Header';

import './global.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('pickem');

  const renderScreen = () => {
    switch (currentTab) {
      case 'create':
        return <CreateSreen />;
      default:
        return (
          <View>
            <Text>Other tabs coming soon</Text>
          </View>
        );
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <Header balance={100.0} onInfoPress={() => {}} onMenuPress={() => {}} />
      {renderScreen()}
      <BottomTabBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import CreateSreen from './components/CreatePage';
import BottomTabBar from 'components/NavigateBar';

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
      {renderScreen()}
      <BottomTabBar currentTab={currentTab} onTabChange={setCurrentTab} />
    </SafeAreaView>
  );
}

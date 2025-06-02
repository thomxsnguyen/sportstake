import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CreateScreen from './components/CreatePage';
import BottomTabBar from './components/NavigateBar';
import Header from './components/Header';
import MyLineups from './components/MyLineups';
import Trade from './components/Trade';
import { LineupProvider } from './context/LineupContext';
import './global.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('pickem');

  const renderScreen = () => {
    switch (currentTab) {
      case 'create':
        return <CreateScreen />;
      case 'lineup':
        return <MyLineups />;
      case 'trade':
        return <Trade />;
      default:
        return (
          <View>
            <Text>Other tabs coming soon</Text>
          </View>
        );
    }
  };

  return (
    <LineupProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <StatusBar style="auto" />
          <Header balance={100.0} onInfoPress={() => {}} onMenuPress={() => {}} />
          {renderScreen()}
          <BottomTabBar currentTab={currentTab} onTabChange={setCurrentTab} />
        </SafeAreaView>
      </SafeAreaProvider>
    </LineupProvider>
  );
}

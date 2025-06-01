import { StatusBar } from 'expo-status-bar';
import { ScreenContent } from 'components/ScreenContent';
import { SafeAreaView } from 'react-native';
import { NavigateBar } from 'components/NavigateBar';

import './global.css';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <NavigateBar />
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
    </SafeAreaView>
  );
}

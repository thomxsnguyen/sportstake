import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const BottomTabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'pickem', label: "Pick'em", icon: 'card-outline' },
    { id: 'lineup', label: 'Lineup', icon: 'list-outline' },
    { id: 'trade', label: 'Trade', icon: 'swap-horizontal-outline' },
    { id: 'create', label: 'Create', icon: 'add-circle-outline' },
    { id: 'promos', label: 'Promos', icon: 'gift-outline' },
  ];
  return (
    <View className="flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          className={`flex-1 items-center ${currentTab === tab.id ? 'text-black' : 'text-gray-500'}`}
          onPress={() => onTabChange(tab.id)}>
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={currentTab === tab.id ? '#000' : '#666'}
          />
          <Text className={`text-xs ${currentTab === tab.id ? 'text-black' : 'text-gray-500'}`}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;

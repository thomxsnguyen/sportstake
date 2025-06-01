import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  balance: number;
  onInfoPress: () => void;
  onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, onInfoPress, onMenuPress }) => {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={24} color="#000" />
      </TouchableOpacity>

      <View className="ml-4 flex-1">
        <Text className="text-sm text-gray-500">Avaliable Balance</Text>
        <View className="flex-row items-center">
          <Text className="text-xl font-bold">${balance.toFixed(2)}</Text>
          <TouchableOpacity className="ml-1">
            <Ionicons name="add-circle" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onInfoPress}>
        <Ionicons name="information-circle-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreatePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1">
      <View className="flex-1 bg-white p-4">
        <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2">
          <TextInput
            className="flex-1 text-base"
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color="#666" />
        </View>
      </View>
    </View>
  );
};

export default CreatePage;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Categories from './Categories';
import Events from './Events';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const CreatePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 bg-white">
        <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <Events />
      </View>
    </View>
  );
};

export default CreatePage;

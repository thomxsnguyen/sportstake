import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Categories from './Categories';
import Events from './Events';

const CreatePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setShowAllCategories(false);
  };

  return (
    <View className="flex-1">
      <View className="flex-1 bg-white">
        {/* Search Bar */}
        <View className="px-4 pb-1">
          <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-1.5">
            <TextInput
              className="flex-1 text-base"
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons name="search" size={20} color="#666" />
          </View>
        </View>

        {/* Categories */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          showAllCategories={showAllCategories}
          onViewAllPress={() => setShowAllCategories(true)}
          onCloseModal={() => setShowAllCategories(false)}
        />

        {/* Events List */}
        <Events />
      </View>
    </View>
  );
};

export default CreatePage;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Categories from './Categories';
import DoublesLineups from './DoublesLineups';

const Trade = () => {
  const [activeTab, setActiveTab] = useState<'market' | 'listings'>('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setShowAllCategories(false);
  };

  return (
    <View className="flex-1">
      {/* Market Toggle */}
      <View className="mb-4 px-4">
        <View className="relative">
          <View className="h-12 overflow-hidden rounded-full bg-gray-100">
            {/* Toggle Background */}
            <View className="absolute inset-0 flex-row">
              <View
                className="h-full w-1/2 rounded-full bg-[#1B1B1B] transition-all"
                style={{
                  transform: [{ translateX: activeTab === 'listings' ? '100%' : '0%' }],
                }}
              />
            </View>

            {/* Toggle Buttons */}
            <View className="relative z-10 h-full flex-row">
              <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => {
                  setActiveTab('market');
                  setSelectedCategory(null);
                }}>
                <Text
                  className={`text-base font-semibold ${
                    activeTab === 'market' ? 'text-white' : 'text-gray-600'
                  }`}>
                  Open Market
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => {
                  setActiveTab('listings');
                  setSelectedCategory(null);
                }}>
                <Text
                  className={`text-base font-semibold ${
                    activeTab === 'listings' ? 'text-white' : 'text-gray-600'
                  }`}>
                  My Listings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="mb-4 px-4">
        <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="ml-2 flex-1 text-base"
            placeholder="Search players..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
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

      {/* Doubles Section */}
      <View className="flex-1">
        <DoublesLineups />
      </View>
    </View>
  );
};

export default Trade;

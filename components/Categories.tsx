import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
  showAllCategories?: boolean;
  onViewAllPress?: () => void;
  showHeader?: boolean;
  onCloseModal?: () => void;
}

export const categories: Category[] = [
  { id: '1', name: 'Basketball', icon: 'sports-basketball' },
  { id: '2', name: 'Football', icon: 'sports-football' },
  { id: '3', name: 'Baseball', icon: 'sports-baseball' },
  { id: '4', name: 'Soccer', icon: 'sports-soccer' },
  { id: '5', name: 'Hockey', icon: 'sports-hockey' },
  { id: '6', name: 'Tennis', icon: 'sports-tennis' },
  { id: '7', name: 'Golf', icon: 'sports-golf' },
  { id: '8', name: 'Rugby', icon: 'sports-rugby' },
  { id: '9', name: 'Volleyball', icon: 'sports-volleyball' },
  { id: '10', name: 'Cricket', icon: 'sports-cricket' },
];

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  showAllCategories = false,
  onViewAllPress,
  showHeader = true,
  onCloseModal,
}) => {
  const displayCategories = showAllCategories ? categories : categories.slice(0, 5);

  const renderCategories = () => (
    <View className="flex-row justify-between px-6">
      {displayCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          onPress={() => onSelectCategory(category.id)}
          className={`h-[68px] w-[68px] items-center justify-center rounded-full ${
            selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'
          }`}>
          <MaterialIcons
            name={category.icon as any}
            size={36}
            color={selectedCategory === category.id ? '#fff' : '#666'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  if (showAllCategories) {
    return (
      <Modal visible={true} animationType="slide" transparent={false} onRequestClose={onCloseModal}>
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar barStyle="dark-content" />
          <View className="flex-1">
            <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
              <Text className="text-xl font-semibold">All Categories</Text>
              <TouchableOpacity
                onPress={onCloseModal}
                className="h-10 w-10 items-center justify-center rounded-full">
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View className="mt-4">{renderCategories()}</View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <View className="mb-4">
      {showHeader && (
        <View className="mb-2 flex-row items-center justify-between px-6">
          <Text className="text-lg font-semibold">Categories</Text>
          {onViewAllPress && (
            <TouchableOpacity className="flex-row items-center" onPress={onViewAllPress}>
              <Text className="mr-1 text-blue-500">View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
            </TouchableOpacity>
          )}
        </View>
      )}
      {renderCategories()}
    </View>
  );
};

export default Categories;

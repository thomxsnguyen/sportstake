import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

const categories: Category[] = [
  { id: '1', name: 'Basketball', icon: 'sports-basketball' },
  { id: '2', name: 'Football', icon: 'sports-football' },
  { id: '3', name: 'Baseball', icon: 'sports-baseball' },
  { id: '4', name: 'Soccer', icon: 'sports-soccer' },
  { id: '5', name: 'Hockey', icon: 'sports-hockey' },
  { id: '6', name: 'Tennis', icon: 'sports-tennis' },
];

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View className="mt-6">
      <View className="mb-4 flex-row items-center justify-between px-4">
        <Text className="text-lg font-semibold">Categories</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="mr-1 text-blue-500">View all</Text>
          <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => onSelectCategory(category.id)}
              className={`h-14 w-14 items-center justify-center rounded-full ${
                selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'
              }`}>
              <MaterialIcons
                name={category.icon as any}
                size={28}
                color={selectedCategory === category.id ? '#fff' : '#666'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Categories;

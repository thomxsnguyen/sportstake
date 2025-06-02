import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSoldLineups } from '../context/LineupContext';

interface SoldLineup {
  id: string;
  playerName: string;
  playerNumber: string;
  jerseyColor: string;
  numberColor: string;
  type: string;
  line: number;
  direction: 'up' | 'down';
  currentValue: number;
  gameTime: string;
}

interface SoldGroup {
  id: string;
  lineups: SoldLineup[];
  wagerAmount: number;
  potentialWin: number;
  timeStamp: string;
}

const renderLineupCard = (lineup: SoldLineup) => (
  <View className="flex-1">
    <View className="p-3">
      <View>
        {/* Jersey and Stats Row */}
        <View className="flex-row">
          {/* Jersey */}
          <View className="relative h-[80px] w-[70px]">
            <View
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: lineup.jerseyColor }}>
              <View
                className="absolute left-4 right-4 top-0 h-3 bg-white opacity-20"
                style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
              />
              <View
                className="absolute -left-1 top-3 h-10 w-3 bg-white opacity-20"
                style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
              />
              <View
                className="absolute -right-1 top-3 h-10 w-3 bg-white opacity-20"
                style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
              />
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-[32px] font-bold" style={{ color: lineup.numberColor }}>
                  {lineup.playerNumber}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats - Single vertical stack */}
          <View className="ml-2 flex-1 items-center justify-center">
            <View className="items-center">
              {/* Arrow and Number */}
              <View className="flex-row items-center">
                <Ionicons
                  name={lineup.direction === 'up' ? 'arrow-up' : 'arrow-down'}
                  size={12}
                  color={lineup.direction === 'up' ? '#22C55E' : '#EF4444'}
                />
                <Text
                  className={`ml-0.5 text-xs font-bold ${
                    lineup.direction === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {lineup.line}
                </Text>
              </View>

              {/* Type */}
              <Text className="text-[10px] text-gray-600">{lineup.type}</Text>

              {/* Current value circle */}
              <View className="mt-1 h-5 w-5 items-center justify-center rounded-full border border-blue-400">
                <Text className="text-[10px] font-bold">{lineup.currentValue}</Text>
              </View>

              {/* Game Time */}
              <Text className="mt-0.5 text-[8px] text-gray-500">{lineup.gameTime}</Text>
            </View>
          </View>
        </View>

        {/* Player Name */}
        <Text className="mt-1 text-xs font-semibold" numberOfLines={1}>
          {lineup.playerName}
        </Text>
      </View>
    </View>
  </View>
);

const SoldBox = ({ lineups, wagerAmount, potentialWin, timeStamp }: SoldGroup) => {
  return (
    <View className="mb-4 flex-row">
      {/* Main container for lineups */}
      <View className="flex-1 overflow-hidden rounded-xl bg-gray-50">
        <View className="flex-row">
          <View className="w-1/2">{renderLineupCard(lineups[0])}</View>
          <View className="my-4 w-[1px] bg-gray-200" />
          <View className="w-1/2">{renderLineupCard(lineups[1])}</View>
        </View>
      </View>

      {/* Sold indicator with timer */}
      <View className="ml-2 self-center">
        <View
          className="rounded-lg bg-green-500 px-3 py-2 shadow-lg"
          style={{
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
          }}>
          <View className="items-center">
            {/* Timer */}
            <View className="mb-1 flex-row items-center">
              <Ionicons name="checkmark-outline" size={12} color="#FFFFFF" />
              <Text className="ml-0.5 text-xs text-white">SOLD</Text>
            </View>
            {/* Wager amount */}
            <Text className="text-xs">
              <Text className="text-white">${wagerAmount} → </Text>
              <Text className="text-white">${potentialWin}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SellingLineups = () => {
  const { soldLineups } = useSoldLineups();

  return (
    <View style={{ flex: 1 }}>
      <Text className="mb-4 px-6 text-2xl font-bold">Sold Lineups</Text>
      {soldLineups.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">No sold lineups</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          {soldLineups.map((group) => (
            <SoldBox key={group.id} {...group} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SellingLineups;

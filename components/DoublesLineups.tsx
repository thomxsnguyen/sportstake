import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DoublesLineup {
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

interface DoublesGroup {
  id: string;
  lineups: DoublesLineup[];
  wagerAmount: number;
  potentialWin: number;
  timeStamp: string;
}

const SAMPLE_DATA: DoublesGroup[] = [
  {
    id: '1',
    wagerAmount: 350,
    potentialWin: 800,
    timeStamp: '01:32',
    lineups: [
      {
        id: '1',
        playerName: 'STEPHEN CURRY',
        playerNumber: '30',
        jerseyColor: '#1D428A',
        numberColor: '#FDB927',
        type: 'PTS',
        line: 18,
        direction: 'up',
        currentValue: 14,
        gameTime: '3Q 12:23',
      },
      {
        id: '2',
        playerName: 'LEBRON JAMES',
        playerNumber: '23',
        jerseyColor: '#FDB927',
        numberColor: '#552583',
        type: 'PTS',
        line: 19,
        direction: 'down',
        currentValue: 5,
        gameTime: '3Q 12:23',
      },
    ],
  },
  {
    id: '2',
    wagerAmount: 80,
    potentialWin: 100,
    timeStamp: '01:35',
    lineups: [
      {
        id: '3',
        playerName: 'KYRIE IRVING',
        playerNumber: '11',
        jerseyColor: '#000000',
        numberColor: '#FFFFFF',
        type: 'PTS',
        line: 15,
        direction: 'up',
        currentValue: 20,
        gameTime: 'END',
      },
      {
        id: '4',
        playerName: 'AUSTIN REAVES',
        playerNumber: '15',
        jerseyColor: '#FDB927',
        numberColor: '#552583',
        type: 'TO',
        line: 2,
        direction: 'down',
        currentValue: 1,
        gameTime: '3Q 12:23',
      },
    ],
  },
  {
    id: '3',
    wagerAmount: 12,
    potentialWin: 100,
    timeStamp: '01:38',
    lineups: [
      {
        id: '5',
        playerName: 'KEVIN DURANT',
        playerNumber: '35',
        jerseyColor: '#1D1160',
        numberColor: '#E56020',
        type: 'RBS',
        line: 4,
        direction: 'up',
        currentValue: 0,
        gameTime: 'HALF',
      },
      {
        id: '6',
        playerName: 'ANTHONY DAVIS',
        playerNumber: '3',
        jerseyColor: '#000000',
        numberColor: '#FFFFFF',
        type: 'PTS',
        line: 17,
        direction: 'up',
        currentValue: 4,
        gameTime: '3Q 12:23',
      },
    ],
  },
];

const renderLineupCard = (lineup: DoublesLineup) => (
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

const DoublesBox = ({ lineups, wagerAmount, potentialWin, timeStamp }: DoublesGroup) => {
  const handleSell = () => {
    Alert.alert('Confirm Sale', `Are you sure you want to sell this double for $${potentialWin}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sell',
        style: 'default',
        onPress: () => {
          Alert.alert('Success', 'Your double has been sold!');
        },
      },
    ]);
  };

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

      {/* List button with timer */}
      <View className="ml-2 self-center">
        <TouchableOpacity
          onPress={handleSell}
          className="rounded-lg bg-black px-3 py-2 shadow-lg"
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
              <Ionicons name="time-outline" size={12} color="#FFFFFF" />
              <Text className="ml-0.5 text-xs text-white">{timeStamp}</Text>
            </View>
            {/* Wager amount */}
            <Text className="text-xs">
              <Text className="text-white">${wagerAmount} → </Text>
              <Text style={{ color: '#4ADE80' }}>${potentialWin}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DoublesLineups = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text className="mb-4 px-6 text-2xl font-bold">Doubles</Text>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {SAMPLE_DATA.map((group) => (
          <DoublesBox key={group.id} {...group} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DoublesLineups;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Lineup {
  id: string;
  playerName: string;
  playerNumber: string;
  teamName: string;
  jerseyColor: string;
  numberColor: string;
  type: 'PTS' | 'TO' | 'RBS';
  line: number;
  direction: 'up' | 'down';
  wagerAmount: number;
  potentialWin: number;
  date: string;
  currentValue: number;
}

// Sample data for testing
const sampleLineups: Lineup[] = [
  {
    id: '1',
    playerName: 'Kyrie Irving',
    playerNumber: '11',
    teamName: 'DAL',
    jerseyColor: '#00538C',
    numberColor: '#FFFFFF',
    type: 'PTS',
    line: 15,
    direction: 'up',
    wagerAmount: 100,
    potentialWin: 175,
    date: 'END',
    currentValue: 20,
  },
  {
    id: '2',
    playerName: 'Austin Reaves',
    playerNumber: '15',
    teamName: 'LAL',
    jerseyColor: '#FDB927',
    numberColor: '#552583',
    type: 'TO',
    line: 2,
    direction: 'down',
    wagerAmount: 100,
    potentialWin: 175,
    date: 'SQ 12/23',
    currentValue: 1,
  },
  {
    id: '3',
    playerName: 'Kevin Durant',
    playerNumber: '35',
    teamName: 'PHX',
    jerseyColor: '#552583',
    numberColor: '#FFFFFF',
    type: 'RBS',
    line: 4,
    direction: 'up',
    wagerAmount: 100,
    potentialWin: 175,
    date: 'HALF',
    currentValue: 0,
  },
  {
    id: '4',
    playerName: 'Anthony Davis',
    playerNumber: '3',
    teamName: 'LAL',
    jerseyColor: '#1D1160',
    numberColor: '#FFFFFF',
    type: 'PTS',
    line: 17,
    direction: 'up',
    wagerAmount: 100,
    potentialWin: 175,
    date: 'SQ 12/23',
    currentValue: 4,
  },
  {
    id: '5',
    playerName: 'Shai Gilgeous-Alexander',
    playerNumber: '2',
    teamName: 'OKC',
    jerseyColor: '#007AC1',
    numberColor: '#FFFFFF',
    type: 'PTS',
    line: 28,
    direction: 'up',
    wagerAmount: 100,
    potentialWin: 350,
    date: 'SQ 12/23',
    currentValue: 21,
  },
];

const renderLineupCard = (lineup: Lineup) => (
  <View className="flex-1 rounded-xl bg-gray-50 p-3">
    <View className="flex-row items-start justify-between">
      <View>
        <View className="relative h-[60px] w-[52px]">
          <View
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: lineup.jerseyColor }}>
            <Text className="text-center text-2xl font-bold" style={{ color: lineup.numberColor }}>
              {lineup.playerNumber}
            </Text>
          </View>
        </View>
        <Text className="mt-1 text-sm font-medium">{lineup.playerName}</Text>
        <Text className="text-xs text-gray-500">{lineup.date}</Text>
      </View>
      <View className="items-end">
        <View className="flex-row items-center">
          <Ionicons
            name={lineup.direction === 'up' ? 'arrow-up' : 'arrow-down'}
            size={14}
            color={lineup.direction === 'up' ? '#22C55E' : '#EF4444'}
          />
          <Text
            className={`ml-1 text-sm font-semibold ${
              lineup.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
            {lineup.line} {lineup.type}
          </Text>
        </View>
        <View className="mt-2 h-[36px] w-[36px] items-center justify-center rounded-full border-4 border-blue-400">
          <Text className="text-sm font-bold">{lineup.currentValue}</Text>
          <Text className="text-[8px] text-gray-500">{lineup.type}</Text>
        </View>
      </View>
    </View>
  </View>
);

const CurrentLineups = () => {
  return (
    <View className="mt-6">
      <Text className="mb-4 px-6 text-2xl font-bold">Active Lineups</Text>
      <View className="px-4">
        {sampleLineups.map((lineup, index) => (
          <React.Fragment key={lineup.id}>
            {index % 2 === 0 && (
              <View className="mb-2 flex-row space-x-2">
                {renderLineupCard(lineup)}
                {index + 1 < sampleLineups.length && renderLineupCard(sampleLineups[index + 1])}
              </View>
            )}
            {index % 2 === 0 && index < sampleLineups.length - 1 && (
              <TouchableOpacity className="mb-4 self-end rounded-lg bg-black px-3 py-1.5">
                <Text className="text-sm font-medium text-white">
                  List ${lineup.wagerAmount} → ${lineup.potentialWin}
                </Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
        {sampleLineups.length % 2 === 1 && (
          <TouchableOpacity className="mb-4 self-end rounded-lg bg-black px-3 py-1.5">
            <Text className="text-sm font-medium text-white">
              List ${sampleLineups[sampleLineups.length - 1].wagerAmount} → $
              {sampleLineups[sampleLineups.length - 1].potentialWin}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CurrentLineups;

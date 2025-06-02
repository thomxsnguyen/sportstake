import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLineups } from '../context/LineupContext';

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

interface GameGroup {
  date: string;
  lineups: Lineup[];
}

const renderLineupCard = (lineup: Lineup) => (
  <View className="flex-1 rounded-xl bg-gray-50 p-3">
    <View className="flex-row items-start justify-between">
      <View className="flex-row">
        <View className="items-center" style={{ width: 52 }}>
          <View className="relative h-[60px] w-[52px]">
            <View
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: lineup.jerseyColor }}>
              <Text
                className="text-center text-2xl font-bold"
                style={{ color: lineup.numberColor }}>
                {lineup.playerNumber}
              </Text>
            </View>
          </View>
          <Text className="mt-1 text-center text-xs" numberOfLines={2}>
            {lineup.playerName}
          </Text>
        </View>

        <View className="ml-3 items-center" style={{ width: 60 }}>
          <View className="flex-row items-center justify-center">
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

          <View className="my-1 h-[36px] w-[36px] items-center justify-center rounded-full border-4 border-blue-400">
            <Text className="text-sm font-bold">{lineup.currentValue}</Text>
            <Text className="text-[8px] text-gray-500">{lineup.type}</Text>
          </View>

          <Text className="text-xs text-gray-500">{lineup.date}</Text>
        </View>
      </View>

      <TouchableOpacity className="self-center rounded-lg bg-black px-3 py-1.5">
        <Text className="text-sm font-medium text-white">
          List ${lineup.wagerAmount} → ${lineup.potentialWin}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const GameBox = ({ date, lineups }: GameGroup) => (
  <View className="mb-6 rounded-xl bg-gray-100 p-4">
    <Text className="mb-3 text-lg font-semibold">{date}</Text>
    <View className="space-y-2">
      {lineups.map((lineup, index) => (
        <React.Fragment key={lineup.id}>{renderLineupCard(lineup)}</React.Fragment>
      ))}
    </View>
  </View>
);

const CurrentLineups = () => {
  const insets = useSafeAreaInsets();
  const { lineups } = useLineups();

  // Group lineups by date
  const groupedLineups = lineups.reduce<Record<string, Lineup[]>>((groups, lineup) => {
    const date = lineup.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(lineup);
    return groups;
  }, {});

  // Convert grouped lineups to array and sort by date
  const gameGroups: GameGroup[] = Object.entries(groupedLineups)
    .map(([date, lineups]) => ({
      date,
      lineups,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <View style={{ flex: 1 }}>
      <Text className="mb-4 px-6 text-2xl font-bold">Active Lineups</Text>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {gameGroups.map((group) => (
          <GameBox key={group.date} date={group.date} lineups={group.lineups} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CurrentLineups;

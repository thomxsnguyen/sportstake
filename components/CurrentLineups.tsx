import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLineups, StatCategory, STAT_DISPLAY_NAMES } from '../context/LineupContext';

interface Lineup {
  id: string;
  playerName: string;
  playerNumber: string;
  teamName: string;
  jerseyColor: string;
  numberColor: string;
  type: StatCategory;
  line: number;
  direction: 'up' | 'down';
  wagerAmount: number;
  potentialWin: number;
  date: string;
  currentValue: number;
  opponent: string;
}

interface GameGroup {
  gameId: string;
  team1: string;
  team2: string;
  lineups: Lineup[];
  totalPotentialWin: number;
  wagerAmount: number;
}

const renderLineupCard = (lineup: Lineup) => (
  <View className="flex-1">
    <View className="p-3">
      <View className="flex-row items-center justify-between">
        {/* Left side - Jersey and Name */}
        <View className="items-center">
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

          {/* Player Name */}
          <Text className="mt-1 text-[11px] font-semibold" numberOfLines={1}>
            {lineup.playerName}
          </Text>
        </View>

        {/* Right side - Stats - Single vertical stack */}
        <View className="flex-1 items-center justify-center">
          <View className="items-center">
            {/* Arrow and Number */}
            <View className="flex-row items-center">
              <Ionicons
                name={lineup.direction === 'up' ? 'arrow-up' : 'arrow-down'}
                size={12}
                color={lineup.direction === 'up' ? '#22C55E' : '#EF4444'}
              />
              <Text
                className={`text-xs font-bold ${
                  lineup.direction === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                {lineup.line}
              </Text>
            </View>

            {/* Type */}
            <Text className="text-[10px] text-gray-500">{lineup.type}</Text>

            {/* Current value circle */}
            <View className="mt-1 h-5 w-5 items-center justify-center rounded-full border border-blue-400">
              <Text className="text-[10px] font-bold">{lineup.currentValue}</Text>
            </View>

            {/* Game Time */}
            <Text className="mt-0.5 text-[8px] text-gray-500">3Q 1:23</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const GameBox = ({
  lineups,
  totalPotentialWin,
  wagerAmount,
  onSell,
}: GameGroup & { onSell: () => void }) => {
  // Split lineups into rows of 2
  const rows = lineups.reduce<Lineup[][]>((acc, lineup, index) => {
    const rowIndex = Math.floor(index / 2);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(lineup);
    return acc;
  }, []);

  const handleSell = () => {
    Alert.alert(
      'Confirm Sale',
      `Are you sure you want to sell these lineups for $${totalPotentialWin}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sell',
          style: 'default',
          onPress: () => {
            onSell();
            Alert.alert('Success', 'Your lineups have been sold!');
          },
        },
      ]
    );
  };

  return (
    <View className="mb-4 flex-row">
      {/* Main container for all lineups */}
      <View className="flex-1 overflow-hidden rounded-xl bg-gray-50">
        {rows.map((rowLineups, rowIndex) => (
          <View key={rowIndex}>
            {/* Row of lineups */}
            <View className="flex-row">
              {rowLineups.length === 1 ? (
                // Single lineup - centered with flex
                <View className="flex-1 flex-row justify-center">
                  <View className="w-1/2">{renderLineupCard(rowLineups[0])}</View>
                </View>
              ) : (
                // Two lineups with divider
                <>
                  <View className="w-1/2">{renderLineupCard(rowLineups[0])}</View>
                  <View className="my-4 w-[1px] bg-gray-200" />
                  <View className="w-1/2">{renderLineupCard(rowLineups[1])}</View>
                </>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* List button */}
      <View className="ml-2 self-center">
        <TouchableOpacity
          onPress={handleSell}
          className="rounded-lg bg-black px-3 py-1.5 shadow-lg"
          style={{
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
          }}>
          <View className="flex-column items-center">
            <Text className="mr-1.5 text-lg font-bold text-white">List</Text>
            <Text className="text-xs">
              <Text className="text-white">${wagerAmount} → </Text>
              <Text style={{ color: '#4ADE80' }}>${totalPotentialWin}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CurrentLineups = () => {
  const insets = useSafeAreaInsets();
  const { lineups, removeLineupsByGame, sellLineupsByGame } = useLineups();

  // Group lineups by specific game matchup
  const groupedLineups = lineups.reduce<Record<string, GameGroup>>((groups, lineup) => {
    // Create a consistent game ID by sorting team names
    const [team1, team2] = [lineup.teamName, lineup.opponent].sort();
    const gameId = `${team1}_${team2}`;

    if (!groups[gameId]) {
      groups[gameId] = {
        gameId,
        team1,
        team2,
        lineups: [],
        totalPotentialWin: 0,
        wagerAmount: 0,
      };
    }
    groups[gameId].lineups.push(lineup);
    groups[gameId].totalPotentialWin += lineup.potentialWin;
    groups[gameId].wagerAmount += lineup.wagerAmount;
    return groups;
  }, {});

  // Convert grouped lineups to array
  const gameGroups = Object.values(groupedLineups);

  const handleSellGame = (gameId: string) => {
    const gameGroup = groupedLineups[gameId];
    if (gameGroup) {
      sellLineupsByGame(
        gameId,
        gameGroup.lineups,
        gameGroup.wagerAmount,
        gameGroup.totalPotentialWin
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text className="mb-4 px-6 text-2xl font-bold">Active Lineups</Text>
      {gameGroups.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">You have no active lineups</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          {gameGroups.map((group) => (
            <GameBox key={group.gameId} {...group} onSell={() => handleSellGame(group.gameId)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CurrentLineups;

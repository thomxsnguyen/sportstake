import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useLineups, StatCategory, STAT_DISPLAY_NAMES } from '../context/LineupContext';

// Sample player data (in a real app, this would come from an API)
const SAMPLE_PLAYERS = [
  {
    name: 'LeBron James',
    number: '23',
    team: 'Lakers',
    jerseyColor: '#552583',
    numberColor: '#FDB927',
    stats: {
      PTS: { line: 28.5, odds: -110 },
      REB: { line: 8.5, odds: -105 },
      AST: { line: 7.5, odds: -115 },
      BLK: { line: 1.5, odds: +120 },
      STL: { line: 1.5, odds: +110 },
      '3PM': { line: 2.5, odds: -108 },
    },
  },
  {
    name: 'Stephen Curry',
    number: '30',
    team: 'Warriors',
    jerseyColor: '#1D428A',
    numberColor: '#FFC72C',
    stats: {
      PTS: { line: 29.5, odds: -115 },
      REB: { line: 5.5, odds: -110 },
      AST: { line: 6.5, odds: -108 },
      BLK: { line: 0.5, odds: +150 },
      STL: { line: 1.5, odds: +105 },
      '3PM': { line: 4.5, odds: -120 },
    },
  },
  {
    name: 'Luka Doncic',
    number: '77',
    team: 'Mavericks',
    jerseyColor: '#00538C',
    numberColor: '#B8C4CA',
    stats: {
      PTS: { line: 32.5, odds: -118 },
      REB: { line: 9.5, odds: -112 },
      AST: { line: 8.5, odds: -110 },
      BLK: { line: 0.5, odds: +140 },
      STL: { line: 1.5, odds: +115 },
      '3PM': { line: 3.5, odds: -105 },
    },
  },
];

const OPPONENTS = {
  Lakers: 'Warriors',
  Warriors: 'Lakers',
  Mavericks: 'Suns',
};

export const CreateWager = () => {
  const { addLineup } = useLineups();
  const [selectedPlayer, setSelectedPlayer] = useState(SAMPLE_PLAYERS[0]);
  const [selectedStat, setSelectedStat] = useState<StatCategory>('PTS');
  const [wagerAmount, setWagerAmount] = useState('');
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const calculatePotentialWin = (amount: number, odds: number) => {
    if (odds > 0) {
      return (amount * odds) / 100;
    } else {
      return (amount * 100) / Math.abs(odds);
    }
  };

  const handleCreateWager = () => {
    if (!wagerAmount || parseFloat(wagerAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid wager amount');
      return;
    }

    const amount = parseFloat(wagerAmount);
    const stat = selectedPlayer.stats[selectedStat];
    const potentialWin = calculatePotentialWin(amount, stat.odds);

    addLineup({
      playerName: selectedPlayer.name,
      playerNumber: selectedPlayer.number,
      teamName: selectedPlayer.team,
      opponent: OPPONENTS[selectedPlayer.team as keyof typeof OPPONENTS],
      jerseyColor: selectedPlayer.jerseyColor,
      numberColor: selectedPlayer.numberColor,
      type: selectedStat,
      line: stat.line,
      direction,
      wagerAmount: amount,
      potentialWin: Math.round(potentialWin * 100) / 100,
      date: new Date().toISOString(),
    });

    // Reset form
    setWagerAmount('');
    Alert.alert(
      'Success',
      `Wager created for ${selectedPlayer.name}'s ${STAT_DISPLAY_NAMES[selectedStat].toLowerCase()}`
    );
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Create Wager</Text>

      {/* Player Selection */}
      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold">Select Player</Text>
        <View className="flex-row flex-wrap">
          {SAMPLE_PLAYERS.map((player) => (
            <TouchableOpacity
              key={player.name}
              onPress={() => setSelectedPlayer(player)}
              className={`mb-2 mr-2 rounded-lg px-3 py-2 ${
                selectedPlayer.name === player.name ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
              <Text
                className={`font-medium ${
                  selectedPlayer.name === player.name ? 'text-white' : 'text-gray-800'
                }`}>
                {player.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stat Category Selection */}
      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold">Select Stat Category</Text>
        <View className="flex-row flex-wrap">
          {Object.entries(STAT_DISPLAY_NAMES).map(([key, name]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedStat(key as StatCategory)}
              className={`mb-2 mr-2 rounded-lg px-3 py-2 ${
                selectedStat === key ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
              <Text
                className={`font-medium ${selectedStat === key ? 'text-white' : 'text-gray-800'}`}>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Direction Selection */}
      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold">Over/Under</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setDirection('up')}
            className={`mr-2 rounded-lg px-4 py-2 ${
              direction === 'up' ? 'bg-green-500' : 'bg-gray-200'
            }`}>
            <Text className={`font-medium ${direction === 'up' ? 'text-white' : 'text-gray-800'}`}>
              Over {selectedPlayer.stats[selectedStat].line}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDirection('down')}
            className={`rounded-lg px-4 py-2 ${
              direction === 'down' ? 'bg-red-500' : 'bg-gray-200'
            }`}>
            <Text
              className={`font-medium ${direction === 'down' ? 'text-white' : 'text-gray-800'}`}>
              Under {selectedPlayer.stats[selectedStat].line}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Wager Amount */}
      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold">Wager Amount</Text>
        <TextInput
          className="rounded-lg border border-gray-300 px-4 py-2"
          keyboardType="numeric"
          placeholder="Enter amount"
          value={wagerAmount}
          onChangeText={setWagerAmount}
        />
      </View>

      {/* Create Button */}
      <TouchableOpacity
        onPress={handleCreateWager}
        className="items-center rounded-lg bg-blue-500 py-3">
        <Text className="text-lg font-bold text-white">Create Wager</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

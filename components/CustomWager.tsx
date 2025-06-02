import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLineups, StatCategory, STAT_DISPLAY_NAMES } from '../context/LineupContext';

interface CustomWagerProps {
  isVisible: boolean;
  onClose: () => void;
  player: {
    name: string;
    number: string;
    team: string;
    opponent: string;
    date: string;
    jerseyColor: string;
    numberColor: string;
  };
}

const STAT_LINES = {
  PTS: 28,
  REB: 8,
  AST: 7,
  BLK: 1.5,
  STL: 1.5,
  '3PM': 2.5,
};

const CustomWager: React.FC<CustomWagerProps> = ({ isVisible, onClose, player }) => {
  const [statType, setStatType] = useState<StatCategory>('PTS');
  const [line, setLine] = useState(STAT_LINES[statType]);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [showStatDropdown, setShowStatDropdown] = useState(false);
  const { addLineup } = useLineups();

  const adjustLine = (newDirection: 'up' | 'down') => {
    setDirection(newDirection);
    setLine((prev) => (newDirection === 'up' ? prev + 0.5 : prev - 0.5));
  };

  const handleStatSelect = (newStat: StatCategory) => {
    setStatType(newStat);
    setLine(STAT_LINES[newStat]);
    setShowStatDropdown(false);
    setDirection(null);
  };

  const handleSubmit = () => {
    if (!direction) return;

    addLineup({
      playerName: player.name,
      playerNumber: player.number,
      teamName: player.team,
      opponent: player.opponent,
      jerseyColor: player.jerseyColor,
      numberColor: player.numberColor,
      type: statType,
      line: line,
      direction: direction,
      wagerAmount: 100,
      potentialWin: 175,
      date: player.date,
    });

    // Show confirmation alert
    Alert.alert(
      'Lineup Created',
      `Added ${player.name} ${direction === 'up' ? 'over' : 'under'} ${line} ${statType} to your lineups`,
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <Pressable className="rounded-t-3xl bg-white p-6" onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Stat</Text>
            <TouchableOpacity
              onPress={() => setShowStatDropdown(!showStatDropdown)}
              className="relative">
              <Text className="text-lg">{STAT_DISPLAY_NAMES[statType]} ▼</Text>

              {/* Stat Type Dropdown */}
              {showStatDropdown && (
                <View className="absolute right-0 top-8 w-36 rounded-lg bg-white shadow-lg">
                  {Object.entries(STAT_DISPLAY_NAMES).map(([key, name]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleStatSelect(key as StatCategory)}
                      className={`px-4 py-3 ${
                        key === statType ? 'bg-blue-50' : ''
                      } border-b border-gray-100`}>
                      <Text className={`${key === statType ? 'font-medium text-blue-500' : ''}`}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Player Info */}
          <View className="mb-6 items-center">
            {/* Jersey */}
            <View className="relative mb-3 h-[80px] w-[70px]">
              <View
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: player.jerseyColor }}>
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
                  <Text className="text-[32px] font-bold" style={{ color: player.numberColor }}>
                    {player.number}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="mb-1 text-xl font-semibold">{player.name}</Text>
            <Text className="text-gray-500">
              vs {player.opponent} {player.date}
            </Text>
          </View>

          {/* Stats Section */}
          <View className="mb-8 flex-row items-center justify-center space-x-4">
            <TouchableOpacity className="items-center" onPress={() => adjustLine('down')}>
              <View
                className={`mb-1 h-12 w-12 items-center justify-center rounded-full ${
                  direction === 'down' ? 'bg-red-500' : 'bg-red-100'
                }`}>
                <Ionicons
                  name="arrow-down"
                  size={24}
                  color={direction === 'down' ? '#fff' : '#EF4444'}
                />
              </View>
            </TouchableOpacity>

            <View className="items-center px-4">
              <Text className="text-3xl font-bold">{line}</Text>
              <Text className="text-gray-500">{statType}</Text>
            </View>

            <TouchableOpacity className="items-center" onPress={() => adjustLine('up')}>
              <View
                className={`mb-1 h-12 w-12 items-center justify-center rounded-full ${
                  direction === 'up' ? 'bg-green-500' : 'bg-green-100'
                }`}>
                <Ionicons
                  name="arrow-up"
                  size={24}
                  color={direction === 'up' ? '#fff' : '#22C55E'}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Line Section */}
          <View className="mb-8">
            <Text className="mb-2 text-center text-blue-500">Sportstake Line: {line}</Text>
          </View>

          {/* Payout Section */}
          <View className="mb-8 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-lg">Payout</Text>
              <Text className="text-lg">1.75x</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg">Wager Amount</Text>
              <Text className="text-lg">$100</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg">Potential Win</Text>
              <Text className="text-lg">$175</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-full bg-blue-400 px-6 py-4"
            onPress={handleSubmit}>
            <Text className="text-xl font-semibold text-white">SUBMIT $100 → $175</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomWager;

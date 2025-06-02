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
  const [line, setLine] = useState(35);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [showStatDropdown, setShowStatDropdown] = useState(false);
  const { addLineup } = useLineups();

  const handleStatSelect = (newStat: StatCategory) => {
    setStatType(newStat);
    setLine(STAT_LINES[newStat]);
    setShowStatDropdown(false);
    setDirection(null);
  };

  const adjustLine = (newDirection: 'up' | 'down') => {
    setDirection(newDirection);
    if (newDirection === 'up') {
      setLine((prev) => prev + 0.5);
    } else {
      setLine((prev) => prev - 0.5);
    }
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
      potentialWin: 150,
      date: player.date,
    });

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
                <View
                  className="absolute left-0 top-8 z-50 w-32 rounded-lg bg-white shadow-lg"
                  style={{ marginLeft: -10 }}>
                  {Object.entries(STAT_DISPLAY_NAMES).map(([key, name]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleStatSelect(key as StatCategory)}
                      className={`px-2 py-1.5 ${
                        key === statType ? 'bg-blue-50' : ''
                      } border-b border-gray-100`}>
                      <Text
                        className={`text-xs ${key === statType ? 'font-medium text-blue-500' : ''}`}>
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
          <View className="mb-6 flex-row items-center justify-center">
            <TouchableOpacity className="mr-8" onPress={() => adjustLine('down')}>
              <View
                className={`h-12 w-12 items-center justify-center rounded-full border-2 ${
                  direction === 'down' ? 'border-red-500 bg-red-500' : 'border-red-300'
                }`}>
                <Ionicons
                  name="arrow-down"
                  size={24}
                  color={direction === 'down' ? '#fff' : '#EF4444'}
                />
              </View>
            </TouchableOpacity>

            <View className="items-center">
              <Text className="text-4xl font-bold">
                {line} {statType}
              </Text>
            </View>

            <TouchableOpacity className="ml-8" onPress={() => adjustLine('up')}>
              <View
                className={`h-12 w-12 items-center justify-center rounded-full border-2 ${
                  direction === 'up' ? 'border-gray-400 bg-gray-400' : 'border-gray-300'
                }`}>
                <Ionicons
                  name="arrow-up"
                  size={24}
                  color={direction === 'up' ? '#fff' : '#9CA3AF'}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Sportstake Line */}
          <View className="mb-8 items-center">
            <Text className="text-blue-500">
              <Text className="font-semibold">Sportstake</Text> Line: {STAT_LINES[statType]}
            </Text>
          </View>

          {/* Payout Section */}
          <View className="mb-2 flex-row justify-between">
            <Text className="text-xl font-semibold">Payout</Text>
            <Text className="text-xl">.5x</Text>
          </View>

          <View className="mb-8 flex-row justify-between">
            <Text className="text-xl font-semibold">Prize Pool</Text>
            <Text className="text-xl">$100</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="flex-row items-center rounded-full bg-blue-400 px-6 py-4"
            onPress={handleSubmit}>
            <View className="mr-4 h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </View>
            <Text className="flex-1 text-center text-xl font-semibold text-white">SUBMIT LINE</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomWager;

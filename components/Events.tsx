import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

interface GameMatch {
  id: string;
  team1: string;
  team2: string;
  isSelected?: boolean;
}

interface Player {
  id: string;
  name: string;
  number: string;
  team: string;
  opponent: string;
  date: string;
  jerseyColor: string;
  numberColor: string;
}

const gameMatches: GameMatch[] = [
  { id: '1', team1: 'LAL', team2: 'GSW', isSelected: true },
  { id: '2', team1: 'DEN', team2: 'DAL' },
  { id: '3', team1: 'PHO', team2: 'MIL' },
  { id: '4', team1: 'OKC', team2: 'BKN' },
  { id: '5', team1: 'POR', team2: 'CHI' },
];

const players: Player[] = [
  {
    id: '1',
    name: 'Anthony Edwards',
    number: '5',
    team: 'MIN',
    opponent: 'GSW',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FFFFFF',
  },
  {
    id: '2',
    name: 'Nikola Jokić',
    number: '15',
    team: 'DEN',
    opponent: 'OKC',
    date: '5-13-25',
    jerseyColor: '#1D428A',
    numberColor: '#FFFFFF',
  },
  {
    id: '3',
    name: 'Stephen Curry',
    number: '30',
    team: 'GSW',
    opponent: 'MIN',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FDB927',
  },
  {
    id: '4',
    name: 'SGA',
    number: '2',
    team: 'OKC',
    opponent: 'DEN',
    date: '5-13-25',
    jerseyColor: '#007AC1',
    numberColor: '#FFFFFF',
  },
  {
    id: '5',
    name: 'Jimmy Butler',
    number: '10',
    team: 'MIA',
    opponent: 'MIN',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FDB927',
  },
  {
    id: '6',
    name: 'Draymond Green',
    number: '23',
    team: 'GSW',
    opponent: 'MIN',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FFFFFF',
  },
];

const Events = () => {
  return (
    <View className="flex-1 bg-white">
      <Text className="mb-3 px-4 text-lg font-semibold">Events</Text>

      <View className="mb-3 px-4">
        <View className="flex-row justify-between">
          {gameMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              className={`mx-0.5 h-[22px] flex-1 items-center justify-center rounded-full px-2 ${
                match.isSelected ? 'bg-black' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-[8px] font-medium leading-none ${
                  match.isSelected ? 'text-white' : 'text-black'
                }`}
                numberOfLines={1}
                adjustsFontSizeToFit>
                {match.team1} vs {match.team2}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Player Cards Grid */}
      <ScrollView className="px-4">
        <View className="flex-row flex-wrap justify-between">
          {players.map((player) => (
            <View key={player.id} className="mb-3 w-[31%] rounded-xl bg-gray-50 p-3">
              <View
                className="mx-auto mb-2 h-20 w-20"
                style={{ backgroundColor: player.jerseyColor }}>
                <Text
                  className="mt-4 text-center text-2xl font-bold"
                  style={{ color: player.numberColor }}>
                  {player.number}
                </Text>
              </View>
              <Text className="mb-1 text-center font-semibold">{player.name}</Text>
              <Text className="text-center text-xs text-gray-500">
                vs {player.opponent} {player.date}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Events;

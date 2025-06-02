import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomWager from './CustomWager';

interface GameMatch {
  id: string;
  team1: string;
  team2: string;
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
  { id: '1', team1: 'LAL', team2: 'GSW' },
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
  const [selectedMatch, setSelectedMatch] = useState<string>('1');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatch(matchId);
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  const renderJersey = (player: Player) => (
    <View className="relative h-[80px] w-[70px]">
      <View className="absolute inset-0 rounded-lg" style={{ backgroundColor: player.jerseyColor }}>
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
  );

  const filteredPlayers = players.filter(
    (player) =>
      player.team === gameMatches.find((m) => m.id === selectedMatch)?.team1 ||
      player.team === gameMatches.find((m) => m.id === selectedMatch)?.team2 ||
      player.opponent === gameMatches.find((m) => m.id === selectedMatch)?.team1 ||
      player.opponent === gameMatches.find((m) => m.id === selectedMatch)?.team2
  );

  // Calculate number of rows needed
  const itemsPerRow = 3;
  const numRows = Math.ceil(filteredPlayers.length / itemsPerRow);
  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    filteredPlayers.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
  );

  return (
    <View className="flex-1 bg-white">
      <Text className="mb-3 px-4 text-lg font-semibold">Events</Text>

      {/* Game matchups section */}
      <View className="mb-3 px-4">
        <View className="flex-row justify-between">
          {gameMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              onPress={() => handleMatchSelect(match.id)}
              className={`mx-0.5 h-[22px] flex-1 items-center justify-center rounded-full px-2 ${
                selectedMatch === match.id ? 'bg-black' : 'bg-gray-100'
              }`}
              activeOpacity={0.7}>
              <Text
                className={`text-[8px] font-medium leading-none ${
                  selectedMatch === match.id ? 'text-white' : 'text-black'
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
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="mb-3 flex-row justify-between">
            {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
              const player = row[colIndex];
              if (!player) {
                return <View key={`empty-${colIndex}`} className="w-[31%]" />;
              }
              return (
                <TouchableOpacity
                  key={player.id}
                  className="w-[31%] items-center rounded-xl bg-gray-50 p-3"
                  onPress={() => handlePlayerSelect(player)}
                  activeOpacity={0.7}>
                  {renderJersey(player)}
                  <Text className="mb-1 mt-2 text-center font-semibold">{player.name}</Text>
                  <Text className="text-center text-xs text-gray-500">
                    vs {player.opponent} {player.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Wager Popup */}
      {selectedPlayer && (
        <CustomWager
          isVisible={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          player={selectedPlayer}
        />
      )}
    </View>
  );
};

export default Events;

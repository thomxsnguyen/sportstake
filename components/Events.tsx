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
  // LAL vs GSW players
  {
    id: '1',
    name: 'LeBron James',
    number: '23',
    team: 'LAL',
    opponent: 'GSW',
    date: '5-12-25',
    jerseyColor: '#552583',
    numberColor: '#FDB927',
  },
  {
    id: '2',
    name: 'Anthony Davis',
    number: '3',
    team: 'LAL',
    opponent: 'GSW',
    date: '5-12-25',
    jerseyColor: '#552583',
    numberColor: '#FDB927',
  },
  {
    id: '3',
    name: 'Stephen Curry',
    number: '30',
    team: 'GSW',
    opponent: 'LAL',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FDB927',
  },
  {
    id: '4',
    name: 'Klay Thompson',
    number: '11',
    team: 'GSW',
    opponent: 'LAL',
    date: '5-12-25',
    jerseyColor: '#1D428A',
    numberColor: '#FDB927',
  },
  // DEN vs DAL players
  {
    id: '5',
    name: 'Nikola Jokić',
    number: '15',
    team: 'DEN',
    opponent: 'DAL',
    date: '5-12-25',
    jerseyColor: '#0E2240',
    numberColor: '#FEC524',
  },
  {
    id: '6',
    name: 'Jamal Murray',
    number: '27',
    team: 'DEN',
    opponent: 'DAL',
    date: '5-12-25',
    jerseyColor: '#0E2240',
    numberColor: '#FEC524',
  },
  {
    id: '7',
    name: 'Luka Dončić',
    number: '77',
    team: 'DAL',
    opponent: 'DEN',
    date: '5-12-25',
    jerseyColor: '#00538C',
    numberColor: '#FFFFFF',
  },
  {
    id: '8',
    name: 'Kyrie Irving',
    number: '11',
    team: 'DAL',
    opponent: 'DEN',
    date: '5-12-25',
    jerseyColor: '#00538C',
    numberColor: '#FFFFFF',
  },
  // PHO vs MIL players
  {
    id: '9',
    name: 'Devin Booker',
    number: '1',
    team: 'PHO',
    opponent: 'MIL',
    date: '5-12-25',
    jerseyColor: '#1D1160',
    numberColor: '#E56020',
  },
  {
    id: '10',
    name: 'Kevin Durant',
    number: '35',
    team: 'PHO',
    opponent: 'MIL',
    date: '5-12-25',
    jerseyColor: '#1D1160',
    numberColor: '#E56020',
  },
  {
    id: '11',
    name: 'Giannis',
    number: '34',
    team: 'MIL',
    opponent: 'PHO',
    date: '5-12-25',
    jerseyColor: '#00471B',
    numberColor: '#EEE1C6',
  },
  {
    id: '12',
    name: 'Damian Lillard',
    number: '0',
    team: 'MIL',
    opponent: 'PHO',
    date: '5-12-25',
    jerseyColor: '#00471B',
    numberColor: '#EEE1C6',
  },
  // OKC vs BKN players
  {
    id: '13',
    name: 'SGA',
    number: '2',
    team: 'OKC',
    opponent: 'BKN',
    date: '5-12-25',
    jerseyColor: '#007AC1',
    numberColor: '#EF3B24',
  },
  {
    id: '14',
    name: 'Chet Holmgren',
    number: '7',
    team: 'OKC',
    opponent: 'BKN',
    date: '5-12-25',
    jerseyColor: '#007AC1',
    numberColor: '#EF3B24',
  },
  {
    id: '15',
    name: 'Mikal Bridges',
    number: '1',
    team: 'BKN',
    opponent: 'OKC',
    date: '5-12-25',
    jerseyColor: '#000000',
    numberColor: '#FFFFFF',
  },
  {
    id: '16',
    name: 'Cam Thomas',
    number: '24',
    team: 'BKN',
    opponent: 'OKC',
    date: '5-12-25',
    jerseyColor: '#000000',
    numberColor: '#FFFFFF',
  },
  // POR vs CHI players
  {
    id: '17',
    name: 'Scoot Henderson',
    number: '00',
    team: 'POR',
    opponent: 'CHI',
    date: '5-12-25',
    jerseyColor: '#E03A3E',
    numberColor: '#FFFFFF',
  },
  {
    id: '18',
    name: 'Anfernee Simons',
    number: '1',
    team: 'POR',
    opponent: 'CHI',
    date: '5-12-25',
    jerseyColor: '#E03A3E',
    numberColor: '#FFFFFF',
  },
  {
    id: '19',
    name: 'DeMar DeRozan',
    number: '11',
    team: 'CHI',
    opponent: 'POR',
    date: '5-12-25',
    jerseyColor: '#CE1141',
    numberColor: '#FFFFFF',
  },
  {
    id: '20',
    name: 'Zach LaVine',
    number: '8',
    team: 'CHI',
    opponent: 'POR',
    date: '5-12-25',
    jerseyColor: '#CE1141',
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
        <View className="flex-row flex-wrap justify-between">
          {players
            .filter(
              (player) =>
                player.team === gameMatches.find((m) => m.id === selectedMatch)?.team1 ||
                player.team === gameMatches.find((m) => m.id === selectedMatch)?.team2 ||
                player.opponent === gameMatches.find((m) => m.id === selectedMatch)?.team1 ||
                player.opponent === gameMatches.find((m) => m.id === selectedMatch)?.team2
            )
            .map((player) => (
              <TouchableOpacity
                key={player.id}
                className="mb-3 w-[31%] items-center rounded-xl bg-gray-50 p-3"
                onPress={() => handlePlayerSelect(player)}
                activeOpacity={0.7}>
                {renderJersey(player)}
                <Text className="mb-1 mt-2 text-center font-semibold">{player.name}</Text>
                <Text className="text-center text-xs text-gray-500">
                  vs {player.opponent} {player.date}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
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

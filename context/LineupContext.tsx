import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lineup {
  id: string;
  playerName: string;
  playerNumber: string;
  teamName: string;
  opponent: string;
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

interface LineupContextType {
  lineups: Lineup[];
  addLineup: (lineup: Omit<Lineup, 'id' | 'currentValue'>) => void;
  removeLineupsByGame: (gameId: string) => void;
}

const LineupContext = createContext<LineupContextType | undefined>(undefined);

export const useLineups = () => {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error('useLineups must be used within a LineupProvider');
  }
  return context;
};

export const LineupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lineups, setLineups] = useState<Lineup[]>([]);

  const addLineup = (newLineup: Omit<Lineup, 'id' | 'currentValue'>) => {
    const lineup: Lineup = {
      ...newLineup,
      id: Date.now().toString(), // Generate a unique ID
      currentValue: 0, // Initialize current value
    };
    setLineups((prev) => [...prev, lineup]);
  };

  const removeLineupsByGame = (gameId: string) => {
    setLineups((prev) => {
      return prev.filter((lineup) => {
        const [team1, team2] = [lineup.teamName, lineup.opponent].sort();
        const currentGameId = `${team1}_${team2}`;
        return currentGameId !== gameId;
      });
    });
  };

  return (
    <LineupContext.Provider value={{ lineups, addLineup, removeLineupsByGame }}>
      {children}
    </LineupContext.Provider>
  );
};

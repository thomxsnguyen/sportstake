import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface LineupContextType {
  lineups: Lineup[];
  addLineup: (lineup: Omit<Lineup, 'id' | 'currentValue'>) => void;
}

const LineupContext = createContext<LineupContextType | undefined>(undefined);

export const useLineups = () => {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error('useLineups must be used within a LineupProvider');
  }
  return context;
};

export const LineupProvider = ({ children }: { children: ReactNode }) => {
  const [lineups, setLineups] = useState<Lineup[]>([]);

  const addLineup = (newLineup: Omit<Lineup, 'id' | 'currentValue'>) => {
    const lineup: Lineup = {
      ...newLineup,
      id: Date.now().toString(), // Generate a unique ID
      currentValue: 0, // Initialize current value
    };
    setLineups((prev) => [...prev, lineup]);
  };

  return <LineupContext.Provider value={{ lineups, addLineup }}>{children}</LineupContext.Provider>;
};

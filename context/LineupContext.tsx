import React, { createContext, useContext, useState } from 'react';

export type StatCategory = 'PTS' | 'REB' | 'AST' | 'BLK' | 'STL' | '3PM';

export const STAT_DISPLAY_NAMES: Record<StatCategory, string> = {
  PTS: 'Points',
  REB: 'Rebounds',
  AST: 'Assists',
  BLK: 'Blocks',
  STL: 'Steals',
  '3PM': '3-Pointers',
};

interface Lineup {
  id: string;
  playerName: string;
  playerNumber: string;
  teamName: string;
  opponent: string;
  jerseyColor: string;
  numberColor: string;
  type: StatCategory;
  line: number;
  direction: 'up' | 'down';
  wagerAmount: number;
  potentialWin: number;
  date: string;
  currentValue: number;
}

interface SoldGroup {
  id: string;
  lineups: Array<{
    id: string;
    playerName: string;
    playerNumber: string;
    jerseyColor: string;
    numberColor: string;
    type: string;
    line: number;
    direction: 'up' | 'down';
    currentValue: number;
    gameTime: string;
  }>;
  wagerAmount: number;
  potentialWin: number;
  timeStamp: string;
}

interface LineupContextType {
  lineups: Lineup[];
  soldLineups: SoldGroup[];
  addLineup: (lineup: Omit<Lineup, 'id' | 'currentValue'>) => void;
  removeLineupsByGame: (gameId: string) => void;
  sellLineupsByGame: (
    gameId: string,
    lineups: Lineup[],
    wagerAmount: number,
    potentialWin: number
  ) => void;
}

const LineupContext = createContext<LineupContextType | undefined>(undefined);

export const useLineups = () => {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error('useLineups must be used within a LineupProvider');
  }
  return context;
};

export const useSoldLineups = () => {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error('useSoldLineups must be used within a LineupProvider');
  }
  return { soldLineups: context.soldLineups };
};

export const LineupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [soldLineups, setSoldLineups] = useState<SoldGroup[]>([]);

  const addLineup = (newLineup: Omit<Lineup, 'id' | 'currentValue'>) => {
    const lineup: Lineup = {
      ...newLineup,
      id: Date.now().toString(),
      currentValue: 0,
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

  const sellLineupsByGame = (
    gameId: string,
    gameLineups: Lineup[],
    wagerAmount: number,
    potentialWin: number
  ) => {
    // Create sold group with exactly 2 lineups (doubles format)
    if (gameLineups.length >= 2) {
      const soldGroup: SoldGroup = {
        id: Date.now().toString(),
        lineups: gameLineups.slice(0, 2).map((lineup) => ({
          id: lineup.id,
          playerName: lineup.playerName,
          playerNumber: lineup.playerNumber,
          jerseyColor: lineup.jerseyColor,
          numberColor: lineup.numberColor,
          type: lineup.type,
          line: lineup.line,
          direction: lineup.direction,
          currentValue: Math.floor(Math.random() * 20), // Random current value
          gameTime: '3Q 12:23',
        })),
        wagerAmount,
        potentialWin,
        timeStamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };

      setSoldLineups((prev) => [...prev, soldGroup]);
    }

    // Remove from active lineups
    removeLineupsByGame(gameId);
  };

  return (
    <LineupContext.Provider
      value={{
        lineups,
        soldLineups,
        addLineup,
        removeLineupsByGame,
        sellLineupsByGame,
      }}>
      {children}
    </LineupContext.Provider>
  );
};

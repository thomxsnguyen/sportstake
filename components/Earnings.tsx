import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y';

interface DataPoint {
  period: string;
  value: number;
}

interface TimeRangeData {
  data: DataPoint[];
  total: number;
}

interface BalanceInfo {
  cash: number;
  atRisk: number;
}

const timeRangeData: Record<TimeRange, TimeRangeData> = {
  '1W': {
    data: [
      { period: 'Mon', value: 1000 },
      { period: 'Tue', value: 1050 },
      { period: 'Wed', value: 1030 },
      { period: 'Thu', value: 1150 },
      { period: 'Fri', value: 1100 },
      { period: 'Sat', value: 1250 },
      { period: 'Sun', value: 1350 },
    ],
    total: 1350,
  },
  '1M': {
    data: [
      { period: 'W1', value: 1000 },
      { period: 'W2', value: 1200 },
      { period: 'W3', value: 1400 },
      { period: 'W4', value: 1600 },
    ],
    total: 1600,
  },
  '3M': {
    data: [
      { period: 'Jan', value: 1200 },
      { period: 'Feb', value: 1500 },
      { period: 'Mar', value: 1800 },
    ],
    total: 1800,
  },
  '6M': {
    data: [
      { period: 'Jan', value: 1000 },
      { period: 'Feb', value: 1300 },
      { period: 'Mar', value: 1600 },
      { period: 'Apr', value: 1750 },
      { period: 'May', value: 1900 },
      { period: 'Jun', value: 2100 },
    ],
    total: 2100,
  },
  '1Y': {
    data: [
      { period: 'Q1', value: 1500 },
      { period: 'Q2', value: 1800 },
      { period: 'Q3', value: 2200 },
      { period: 'Q4', value: 2500 },
    ],
    total: 2500,
  },
};

const balanceData: Record<TimeRange, BalanceInfo> = {
  '1W': { cash: 850, atRisk: 500 },
  '1M': { cash: 1000, atRisk: 600 },
  '3M': { cash: 1200, atRisk: 600 },
  '6M': { cash: 1500, atRisk: 600 },
  '1Y': { cash: 1800, atRisk: 700 },
};

const timeRanges: TimeRange[] = ['1W', '1M', '3M', '6M', '1Y'];

const Earnings = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1W');
  const screenWidth = Dimensions.get('window').width;
  const graphWidth = screenWidth - 48;
  const graphHeight = 100;
  const paddingHorizontal = 16;
  const paddingBottom = 20;
  const paddingTop = 12;

  const currentData = timeRangeData[selectedRange].data;

  // Calculate points for the graph
  const maxValue = Math.max(...currentData.map((d) => d.value));
  const minValue = Math.min(...currentData.map((d) => d.value));
  const range = maxValue - minValue;

  // Create points with more data points for smoother curve
  const points: string[] = [];
  currentData.forEach((d, i) => {
    if (i < currentData.length - 1) {
      // Add 3 interpolated points between each data point
      const nextD = currentData[i + 1];
      const xStep = (graphWidth - 2 * paddingHorizontal) / (currentData.length - 1) / 4;
      const yStep = (nextD.value - d.value) / 4;

      for (let j = 0; j < 4; j++) {
        const x =
          paddingHorizontal +
          (i * (graphWidth - 2 * paddingHorizontal)) / (currentData.length - 1) +
          j * xStep;
        const y =
          graphHeight -
          paddingBottom -
          ((d.value + j * yStep - minValue) / range) * (graphHeight - paddingBottom - paddingTop);
        points.push(`${j === 0 && i === 0 ? 'M' : 'L'} ${x},${y}`);
      }
    } else {
      // Add the last point
      const x =
        paddingHorizontal + (i * (graphWidth - 2 * paddingHorizontal)) / (currentData.length - 1);
      const y =
        graphHeight -
        paddingBottom -
        ((d.value - minValue) / range) * (graphHeight - paddingBottom - paddingTop);
      points.push(`L ${x},${y}`);
    }
  });

  const smoothPath = points.join(' ');
  const currentBalance = balanceData[selectedRange];
  const totalBalance = currentBalance.cash + currentBalance.atRisk;

  return (
    <View className="mx-6 rounded-3xl bg-gray-50 p-5">
      <Text className="mb-1 text-lg text-[#6B7280]">Lifetime Prizes</Text>
      <Text className="mb-2 text-4xl font-semibold text-[#60A5FA]">
        ${timeRangeData[selectedRange].total.toLocaleString()}
      </Text>

      <View className="relative">
        <Svg height={graphHeight} width={graphWidth}>
          <Path d={smoothPath} fill="none" stroke="#60A5FA" strokeWidth="2" />
        </Svg>

        {/* Time period labels */}
        <View className="flex-row justify-between px-4">
          {currentData.map((d, i) => (
            <Text key={i} className="text-sm text-gray-500">
              {d.period}
            </Text>
          ))}
        </View>

        {/* Time range selector */}
        <View className="mt-2 flex-row justify-between">
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
              className={`rounded-full px-3 py-1 ${
                selectedRange === range ? 'bg-[#60A5FA]' : 'bg-transparent'
              }`}>
              <Text
                className={`text-xs ${selectedRange === range ? 'text-white' : 'text-gray-500'}`}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Balance Breakdown - removed border-t and adjusted spacing */}
        <View className="mt-3">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-gray-500">Cash Balance</Text>
              <Text className="text-base font-semibold">
                ${currentBalance.cash.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text className="text-xs text-gray-500">At Risk</Text>
              <Text className="text-base font-semibold text-orange-500">
                ${currentBalance.atRisk.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text className="text-xs text-gray-500">Total Balance</Text>
              <Text className="text-base font-semibold text-green-500">
                ${totalBalance.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Earnings;

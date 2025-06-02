import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DataPoint {
  period: string;
  value: number;
}

const mockData: DataPoint[] = [
  { period: '1W', value: 1000 },
  { period: '1M', value: 1100 },
  { period: '3M', value: 1200 },
  { period: '6M', value: 1250 },
  { period: '1Y', value: 1350 },
];

const Lineup = () => {
  const screenWidth = Dimensions.get('window').width;
  const graphWidth = screenWidth - 32; // 16px padding on each side
  const graphHeight = 180;
  const paddingBottom = 40;
  const paddingTop = 20;

  // Calculate points for the graph
  const maxValue = Math.max(...mockData.map((d) => d.value));
  const minValue = Math.min(...mockData.map((d) => d.value));
  const range = maxValue - minValue;

  // Create points with more data points for smoother curve
  const points: string[] = [];
  mockData.forEach((d, i) => {
    if (i < mockData.length - 1) {
      // Add 3 interpolated points between each data point
      const nextD = mockData[i + 1];
      const xStep = graphWidth / (mockData.length - 1) / 4;
      const yStep = (nextD.value - d.value) / 4;

      for (let j = 0; j < 4; j++) {
        const x = (i * graphWidth) / (mockData.length - 1) + j * xStep;
        const y =
          graphHeight -
          paddingBottom -
          ((d.value + j * yStep - minValue) / range) * (graphHeight - paddingBottom - paddingTop);
        points.push(`${j === 0 && i === 0 ? 'M' : 'L'} ${x},${y}`);
      }
    } else {
      // Add the last point
      const x = (i * graphWidth) / (mockData.length - 1);
      const y =
        graphHeight -
        paddingBottom -
        ((d.value - minValue) / range) * (graphHeight - paddingBottom - paddingTop);
      points.push(`L ${x},${y}`);
    }
  });

  // Add curve commands
  const smoothPath = points.join(' ');

  return (
    <View className="mx-4 rounded-3xl bg-gray-50 p-6">
      <Text className="mb-1 text-lg text-[#6B7280]">Lifetime Prizes</Text>
      <Text className="mb-6 text-5xl font-semibold text-[#60A5FA]">
        ${mockData[mockData.length - 1].value.toLocaleString()}
      </Text>

      <View className="relative">
        <Svg height={graphHeight} width={graphWidth}>
          {/* Graph line */}
          <Path d={smoothPath} fill="none" stroke="#60A5FA" strokeWidth="2" />
        </Svg>

        {/* Time period labels */}
        <View className="mt-2 flex-row justify-between">
          {mockData.map((d, i) => (
            <Text key={i} className="text-sm text-gray-500">
              {d.period}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Lineup;

# Project Overview

A React Native mobile application built with Expo for sports betting and lineup management. Features lineup creation, trading functionality, and pick management.

## Overview

### What I Built

Three main screens: Create page for making lineups, MyLineups to see your lineups, and Trade for trading functionality. Also built a header with balance display, bottom navigation bar, and a bunch of components for different features like earnings tracking, events, custom wagers, and managing different types of lineups.

### Quick Overview

**Expo:** Went with Expo because it's just easier to get something working quickly across platforms. Don't have to mess with native code setup.

**State Management:** Used React Context for sharing lineup data between components. Could have used Redux but Context seemed like enough for this size app.

**Styling:** Chose NativeWind because I like Tailwind and wanted consistent styling. Makes it faster to build UI without writing custom CSS for everything.

**Components:** Split everything into separate components so it's easier to work with. Each major feature gets its own file instead of cramming everything together.

**Navigation:** Built a custom tab bar instead of using React Navigation because I wanted more control over how it looks and behaves.

**TypeScript:** Used TypeScript because dealing with money/betting data and want to catch errors before they happen.

## Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device (for testing)

## Installation

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd my-expo-app
   npm install
   ```

## Running the Project

**Start development server:**

```bash
npm start
```

**Platform-specific:**

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

**On physical device:**

1. Install Expo Go app from App Store/Google Play
2. Run `npm start`
3. Scan the QR code with your device

## Available Scripts

- `npm start` - Start development server
- `npm run ios` - Start on iOS simulator
- `npm run android` - Start on Android emulator
- `npm run web` - Start web version
- `npm run lint` - Check code quality
- `npm run format` - Format code

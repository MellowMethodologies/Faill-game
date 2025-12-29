# Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (will be installed with dependencies)
- For mobile testing:
  - iOS: Mac with Xcode
  - Android: Android Studio with emulator
  - Physical device: Expo Go app

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MellowMethodologies/Faill-game.git
   cd Faill-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the App

### Start Development Server
```bash
npm start
```

This will open Expo DevTools in your browser.

### Run on Specific Platform

**iOS Simulator (Mac only):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

**Physical Device:**
1. Install Expo Go app from App Store/Play Store
2. Scan QR code from terminal or browser
3. App will load on your device

## Project Structure

```
Faill-game/
├── App.js              # Main application file
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── babel.config.js     # Babel configuration
├── .gitignore          # Git ignore rules
├── README.md           # Project overview
├── IMPLEMENTATION.md   # Technical details
└── VISUAL_GUIDE.md     # UI/UX guide
```

## Key Components

### Main Application (App.js)

**Screens:**
- `menu` - Main menu
- `tutorial` - Instructions
- `levelSelect` - Difficulty selection
- `game` - Active gameplay
- `gameOver` - Results screen

**State Variables:**
- `screen` - Current screen
- `selectedDifficulty` - Chosen difficulty
- `score` - Current score
- `hits` - Successful hits
- `misses` - Failed attempts
- `targets` - Active targets array
- `timeLeft` - Remaining time
- `gameActive` - Game running status

**Difficulty Configurations:**
```javascript
EASY: {
  targetSize: 80,
  speed: 1500,
  targetCount: 5,
}
MEDIUM: {
  targetSize: 60,
  speed: 1000,
  targetCount: 8,
}
HARD: {
  targetSize: 40,
  speed: 700,
  targetCount: 12,
}
```

## Customization Guide

### Modify Game Duration
In `App.js`, change the initial time value:
```javascript
const [timeLeft, setTimeLeft] = useState(30); // Change 30 to desired seconds
```

### Adjust Scoring
Find the scoring logic:
```javascript
setScore((prev) => prev + 10); // Change 10 to desired points
```

### Change Difficulty Settings
Modify the `DIFFICULTIES` object:
```javascript
EASY: {
  name: 'Easy',
  targetSize: 80,      // Larger = easier
  speed: 1500,         // Higher = slower spawn
  targetCount: 5,      // More = busier screen
  description: '...',
}
```

### Customize Colors
Edit the `styles` object at the bottom of `App.js`:
```javascript
container: {
  backgroundColor: '#1a1a2e', // Change background
},
target: {
  backgroundColor: '#e94560',  // Change target color
},
```

## Testing Tips

1. **Test on multiple screen sizes:**
   - Small phone (iPhone SE)
   - Large phone (iPhone 14 Pro Max)
   - Tablet (iPad)

2. **Test all difficulty levels:**
   - Easy should be approachable
   - Medium should be challenging
   - Hard should be very difficult

3. **Verify edge cases:**
   - No hits (0/0 accuracy)
   - Perfect accuracy (all hits)
   - Time running out
   - Pause/resume functionality

4. **Performance check:**
   - Smooth animations
   - No lag with multiple targets
   - Responsive touch detection

## Troubleshooting

**Metro bundler issues:**
```bash
npm start -- --reset-cache
```

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Expo CLI not found:**
```bash
npm install -g expo-cli
```

**iOS simulator not opening:**
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

## Common Development Tasks

### Add Sound Effects
1. Install expo-av: `npm install expo-av`
2. Import Audio: `import { Audio } from 'expo-av';`
3. Load and play sounds on target hit

### Add Haptic Feedback
1. Install expo-haptics: `npm install expo-haptics`
2. Import: `import * as Haptics from 'expo-haptics';`
3. Trigger on events: `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);`

### Add Persistent Storage
1. Install AsyncStorage: `npm install @react-native-async-storage/async-storage`
2. Save high scores
3. Load on app start

## Support

For issues or questions:
- Check IMPLEMENTATION.md for technical details
- Review VISUAL_GUIDE.md for UI information
- Check Expo documentation: https://docs.expo.dev/
- React Native docs: https://reactnative.dev/

## License

This project is open source and available for educational purposes.

# 🎯 Aim Training Game

An educational React Native game designed to teach users how to properly aim with progressively difficult levels.

## Features

- **Three Difficulty Levels:**
  - 🟢 **Easy**: Large targets, slow movement - Perfect for beginners
  - 🟡 **Medium**: Medium-sized targets, moderate speed - Build your skills
  - 🔴 **Hard**: Small targets, fast movement - Master precision

- **Game Mechanics:**
  - 30-second timed challenges
  - Dynamic target spawning
  - Real-time scoring system
  - Accuracy tracking (hits/misses)
  - Performance ratings (⭐ to ⭐⭐⭐⭐⭐)

- **Educational Elements:**
  - Interactive tutorial explaining game mechanics
  - Visual feedback for successful hits
  - Accuracy statistics to track improvement
  - Progressive difficulty to develop aiming skills

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the app:
```bash
npm start
```

3. Run on your platform:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web

## How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard
2. **Aim and Tap**: Targets will appear on screen - tap them quickly!
3. **Beat the Clock**: You have 30 seconds to score as many points as possible
4. **Track Progress**: Monitor your score, time, and accuracy in real-time
5. **Improve**: Review your stats and try to beat your high score!

## Scoring

- Each successful hit: **+10 points**
- Accuracy is calculated as: **Hits / (Hits + Misses)**
- Star ratings based on accuracy:
  - ⭐⭐⭐⭐⭐ 90%+ accuracy
  - ⭐⭐⭐⭐ 75%+ accuracy
  - ⭐⭐⭐ 60%+ accuracy
  - ⭐⭐ 40%+ accuracy
  - ⭐ Below 40% accuracy

## Technologies Used

- React Native
- Expo
- React Hooks for state management
- Animated API for smooth animations

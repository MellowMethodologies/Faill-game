import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Difficulty configurations
const DIFFICULTIES = {
  EASY: {
    name: 'Easy',
    targetSize: 80,
    speed: 1500,
    targetCount: 5,
    description: 'Large targets, slow movement',
  },
  MEDIUM: {
    name: 'Medium',
    targetSize: 60,
    speed: 1000,
    targetCount: 8,
    description: 'Medium targets, moderate movement',
  },
  HARD: {
    name: 'Hard',
    targetSize: 40,
    speed: 700,
    targetCount: 12,
    description: 'Small targets, fast movement',
  },
};

export default function App() {
  const [screen, setScreen] = useState('menu'); // menu, tutorial, levelSelect, game, gameOver
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [targets, setTargets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  // Target spawning effect
  useEffect(() => {
    if (gameActive && selectedDifficulty) {
      const config = DIFFICULTIES[selectedDifficulty];
      const interval = setInterval(() => {
        spawnTarget(config);
      }, config.speed);
      return () => clearInterval(interval);
    }
  }, [gameActive, selectedDifficulty]);

  const spawnTarget = (config) => {
    const id = Date.now() + Math.random();
    const maxX = width - config.targetSize - 40;
    const maxY = height - config.targetSize - 200;
    const minX = 20;
    const minY = 100;

    const newTarget = {
      id,
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY,
      size: config.targetSize,
    };

    setTargets((prev) => {
      // Limit number of targets on screen
      if (prev.length >= config.targetCount) {
        return [...prev.slice(1), newTarget];
      }
      return [...prev, newTarget];
    });

    // Remove target after 2 seconds if not hit
    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  const handleTargetHit = (targetId) => {
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    setScore((prev) => prev + 10);
    setHits((prev) => prev + 1);
  };

  const handleMiss = () => {
    setMisses((prev) => prev + 1);
  };

  const startGame = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setScore(0);
    setHits(0);
    setMisses(0);
    setTimeLeft(30);
    setTargets([]);
    setGameActive(true);
    setScreen('game');
  };

  const endGame = () => {
    setGameActive(false);
    setScreen('gameOver');
  };

  const returnToMenu = () => {
    setScreen('menu');
    setSelectedDifficulty(null);
    setTargets([]);
    setGameActive(false);
  };

  // Menu Screen
  if (screen === 'menu') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>🎯 Aim Training Game</Text>
        <Text style={styles.subtitle}>Master Your Precision</Text>
        
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setScreen('tutorial')}
        >
          <Text style={styles.menuButtonText}>📖 How to Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setScreen('levelSelect')}
        >
          <Text style={styles.menuButtonText}>🎮 Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tutorial Screen
  if (screen === 'tutorial') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>📖 How to Play</Text>
        
        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialHeading}>🎯 Objective</Text>
          <Text style={styles.tutorialText}>
            Tap the targets as quickly as possible before they disappear!
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialHeading}>⏱️ Time Limit</Text>
          <Text style={styles.tutorialText}>
            You have 30 seconds to score as many points as possible.
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialHeading}>📊 Scoring</Text>
          <Text style={styles.tutorialText}>
            • Each hit: +10 points{'\n'}
            • Track your accuracy with hits/misses counter
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.tutorialHeading}>🎚️ Difficulty Levels</Text>
          <Text style={styles.tutorialText}>
            • Easy: Large, slow targets{'\n'}
            • Medium: Moderate size and speed{'\n'}
            • Hard: Small, fast targets
          </Text>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.menuButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Level Select Screen
  if (screen === 'levelSelect') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Select Difficulty</Text>
        
        {Object.entries(DIFFICULTIES).map(([key, config]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.levelButton,
              key === 'EASY' && styles.easyButton,
              key === 'MEDIUM' && styles.mediumButton,
              key === 'HARD' && styles.hardButton,
            ]}
            onPress={() => startGame(key)}
          >
            <Text style={styles.levelButtonTitle}>{config.name}</Text>
            <Text style={styles.levelButtonDesc}>{config.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Game Screen
  if (screen === 'game') {
    return (
      <TouchableOpacity
        style={styles.gameContainer}
        activeOpacity={1}
        onPress={handleMiss}
      >
        <StatusBar style="light" />
        
        {/* HUD */}
        <View style={styles.hud}>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>Score</Text>
            <Text style={styles.hudValue}>{score}</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>Time</Text>
            <Text style={styles.hudValue}>{timeLeft}s</Text>
          </View>
          <View style={styles.hudItem}>
            <Text style={styles.hudLabel}>Accuracy</Text>
            <Text style={styles.hudValue}>
              {hits}/{hits + misses}
            </Text>
          </View>
        </View>

        {/* Targets */}
        {targets.map((target) => (
          <Target
            key={target.id}
            target={target}
            onHit={() => handleTargetHit(target.id)}
          />
        ))}

        {/* Pause button */}
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => {
            setGameActive(false);
            Alert.alert(
              'Paused',
              'Game is paused',
              [
                { text: 'Resume', onPress: () => setGameActive(true) },
                { text: 'Quit', onPress: returnToMenu },
              ]
            );
          }}
        >
          <Text style={styles.pauseButtonText}>⏸</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  // Game Over Screen
  if (screen === 'gameOver') {
    const accuracy = hits + misses > 0 
      ? ((hits / (hits + misses)) * 100).toFixed(1)
      : 0;
    
    let rating = '⭐';
    if (accuracy >= 90) rating = '⭐⭐⭐⭐⭐';
    else if (accuracy >= 75) rating = '⭐⭐⭐⭐';
    else if (accuracy >= 60) rating = '⭐⭐⭐';
    else if (accuracy >= 40) rating = '⭐⭐';

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Game Over!</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.rating}>{rating}</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Final Score:</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hits:</Text>
            <Text style={styles.statValue}>{hits}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Misses:</Text>
            <Text style={styles.statValue}>{misses}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Accuracy:</Text>
            <Text style={styles.statValue}>{accuracy}%</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Difficulty:</Text>
            <Text style={styles.statValue}>
              {DIFFICULTIES[selectedDifficulty].name}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => startGame(selectedDifficulty)}
        >
          <Text style={styles.menuButtonText}>🔄 Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setScreen('levelSelect')}
        >
          <Text style={styles.menuButtonText}>🎚️ Change Difficulty</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={returnToMenu}
        >
          <Text style={styles.backButtonText}>← Main Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

// Target Component with animation
function Target({ target, onHit }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onHit();
  };

  return (
    <TouchableOpacity
      style={[
        styles.target,
        {
          left: target.x,
          top: target.y,
          width: target.size,
          height: target.size,
          borderRadius: target.size / 2,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.targetInner,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.targetCenter}>
          <View style={styles.targetDot} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#0f3460',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 40,
  },
  menuButton: {
    backgroundColor: '#16213e',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tutorialBox: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  tutorialHeading: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tutorialText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 22,
  },
  levelButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
  },
  easyButton: {
    backgroundColor: '#2d4a2b',
    borderColor: '#4CAF50',
  },
  mediumButton: {
    backgroundColor: '#4a3f2b',
    borderColor: '#FF9800',
  },
  hardButton: {
    backgroundColor: '#4a2b2b',
    borderColor: '#F44336',
  },
  levelButtonTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  levelButtonDesc: {
    color: '#ccc',
    fontSize: 14,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
  },
  backButtonText: {
    color: '#aaa',
    fontSize: 16,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hudItem: {
    alignItems: 'center',
  },
  hudLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 5,
  },
  hudValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  target: {
    position: 'absolute',
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  targetInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetCenter: {
    width: '40%',
    height: '40%',
    borderRadius: 1000,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetDot: {
    width: '50%',
    height: '50%',
    borderRadius: 1000,
    backgroundColor: '#000',
  },
  pauseButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  pauseButtonText: {
    fontSize: 20,
  },
  statsContainer: {
    backgroundColor: '#16213e',
    padding: 30,
    borderRadius: 15,
    width: '90%',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  rating: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 18,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

# Game Screens Visual Guide

## 1. Main Menu Screen
```
┌─────────────────────────────────┐
│                                 │
│    🎯 Aim Training Game         │
│    Master Your Precision        │
│                                 │
│  ┌──────────────────────────┐  │
│  │   📖 How to Play         │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │   🎮 Start Game          │  │
│  └──────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

## 2. Tutorial Screen
```
┌─────────────────────────────────┐
│    📖 How to Play               │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 🎯 Objective              │  │
│  │ Tap targets quickly       │  │
│  │ before they disappear!    │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ ⏱️ Time Limit             │  │
│  │ 30 seconds to score       │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 📊 Scoring                │  │
│  │ Each hit: +10 points      │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 🎚️ Difficulty Levels      │  │
│  │ Easy/Medium/Hard          │  │
│  └──────────────────────────┘  │
│                                 │
│     [Back to Menu]              │
└─────────────────────────────────┘
```

## 3. Level Selection Screen
```
┌─────────────────────────────────┐
│    Select Difficulty            │
│                                 │
│  ┌──────────────────────────┐  │
│  │        Easy              │  │
│  │ Large, slow targets      │  │
│  └──────────────────────────┘  │
│         (Green)                 │
│                                 │
│  ┌──────────────────────────┐  │
│  │       Medium             │  │
│  │ Moderate size & speed    │  │
│  └──────────────────────────┘  │
│         (Orange)                │
│                                 │
│  ┌──────────────────────────┐  │
│  │        Hard              │  │
│  │ Small, fast targets      │  │
│  └──────────────────────────┘  │
│         (Red)                   │
│                                 │
│     ← Back                      │
└─────────────────────────────────┘
```

## 4. Game Screen
```
┌─────────────────────────────────┐
│ Score: 50  Time: 18s  Acc: 5/7 │ ← HUD
├─────────────────────────────────┤
│                          ⏸      │ ← Pause
│                                 │
│        ◉                        │ ← Target
│                                 │
│                     ◉           │ ← Target
│                                 │
│    ◉                            │ ← Target
│                                 │
│                         ◉       │ ← Target
│                                 │
│               ◉                 │ ← Target
│                                 │
└─────────────────────────────────┘

Target Design:
  ┌───────┐
  │   ●   │  ← Red circle with
  │  ⚪️   │     white center
  │   ●   │     and black dot
  └───────┘
```

## 5. Game Over Screen
```
┌─────────────────────────────────┐
│      Game Over!                 │
│                                 │
│  ┌──────────────────────────┐  │
│  │      ⭐⭐⭐⭐⭐            │  │
│  │                          │  │
│  │  Final Score:    150     │  │
│  │  Hits:           15      │  │
│  │  Misses:         3       │  │
│  │  Accuracy:       83.3%   │  │
│  │  Difficulty:     Medium  │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │   🔄 Play Again          │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │   🎚️ Change Difficulty   │  │
│  └──────────────────────────┘  │
│                                 │
│     ← Main Menu                 │
└─────────────────────────────────┘
```

## Color Scheme

- Background: Dark blue/navy (#1a1a2e, #0f3460)
- Accent: Bright red (#e94560)
- Text: White/Light gray
- Borders: White/Gray
- Difficulty Colors:
  - Easy: Green (#4CAF50)
  - Medium: Orange (#FF9800)
  - Hard: Red (#F44336)

## Animations

1. **Target Spawn**: Spring animation from scale 0 to 1
2. **Target Hit**: Pulse to 1.2x then shrink to 0
3. **Screen Transitions**: Smooth navigation between screens

## Interactive Elements

- All buttons provide visual feedback on press
- Targets respond to touch with animation
- HUD updates in real-time
- Pause functionality during gameplay
- Touch anywhere on background counts as miss

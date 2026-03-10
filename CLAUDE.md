# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DegenBall is a single-file React prototype for a satirical fantasy football trading card application. It combines sports fantasy mechanics with cryptocurrency/trading aesthetics. Players can buy/sell virtual football players, manage squads, simulate matches with betting, and view an activity feed.

## Tech Stack

- React 18+ with hooks (useState, useEffect, useRef)
- Pure JavaScript (no TypeScript)
- CSS-in-JS via inline style objects (no external CSS)
- Google Fonts: DM Sans (UI), JetBrains Mono (numeric displays)

## Development Setup

This is a standalone JSX component with no build configuration. To run:
1. Import into any React environment (Vite, Create React App, Next.js, etc.)
2. Render the default export `DegenFootball` component

No package.json, tests, or build scripts exist in this repository.

## Architecture

**Single file structure** (`degen-football-prototype.jsx`, ~665 lines):

- **Constants** (lines 3-80): Player data generators, rarity tiers, traits, feed message templates
- **Utility functions**: `generatePlayer()`, `calcOverall()`, `generateFeedItem()`
- **Components**:
  - `StatBar` - Visual stat indicator
  - `PlayerCard` - Dual-mode (full/compact) player display
  - `MatchSimulator` - Live match with betting
  - `PlayerModal` - Purchase/sell interface
  - `DegenFootball` - Main app with state management and 4-tab navigation (Market, Squad, Arena, Feed)

**State management**: Local component state only via React hooks

## Key Mechanics

- **Rarity system**: Bronze (60%), Silver (25%), Gold (20%), Diamond (15%), Ballon d'Fraud (5%)
- **Pricing**: Dynamic based on rarity with 5% sell fee
- **Match simulation**: 90-minute simulation with 1.8x betting multiplier
- **Feed**: Auto-updates every 4 seconds with randomized activity

## Styling Conventions

- Dark theme with neon accents (#00ff87 green, #ffd700 gold)
- All styles are inline via React style objects
- Mobile-first design (max-width: 480px container)
- Gradient backgrounds with glow effects for rarity tiers

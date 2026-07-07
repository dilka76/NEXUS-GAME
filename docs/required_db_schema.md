# Required Database Schema - Who Wants to be a Millionaire Game

## Overview
This document outlines all the database tables and relationships needed for a modern "Who wants to be a millionaire" game application.

---

## Core Tables

### 1. Users/Players Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```
**Purpose**: Store player account information and authentication data.

---

### 2. Difficulty Levels Table
```sql
CREATE TABLE difficulty_levels (
  id SERIAL PRIMARY KEY,
  level INT UNIQUE NOT NULL,
  prize_amount DECIMAL(15, 2) NOT NULL,
  difficulty_name TEXT NOT NULL
);
```
**Purpose**: Define the 15 difficulty tiers with corresponding prize amounts.
**Example Data**: 
- Level 1: $100
- Level 5: $32,000
- Level 15: $1,000,000

---

### 3. Questions Table
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  difficulty_level_id INT REFERENCES difficulty_levels(id),
  question_text TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```
**Purpose**: Store all quiz questions with their difficulty levels and categories.

---

### 4. Answers Table
```sql
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```
**Purpose**: Store the 4 answer options for each question, marking which is correct.
**Constraint**: Each question should have exactly 4 answer options.

---

### 5. Lifelines Table
```sql
CREATE TABLE lifelines (
  id SERIAL PRIMARY KEY,
  lifeline_name TEXT UNIQUE NOT NULL,
  description TEXT
);
```
**Purpose**: Define available lifelines (50:50, Phone a Friend, Ask Audience).
**Example Data**:
- 50:50 - Removes two incorrect answers
- Phone a Friend - Call someone for advice
- Ask Audience - Poll the audience for their answer

---

### 6. Game Sessions Table
```sql
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMP DEFAULT now(),
  ended_at TIMESTAMP,
  current_level INT DEFAULT 1,
  prize_won DECIMAL(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'in_progress'
);
```
**Purpose**: Track each game attempt by a player.
**Status Values**: 'in_progress', 'won', 'lost', 'abandoned'

---

### 7. Game Progress Table
```sql
CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  answer_given UUID REFERENCES answers(id),
  lifelines_used INT[] DEFAULT ARRAY[]::INT[],
  answered_at TIMESTAMP DEFAULT now()
);
```
**Purpose**: Track each answer given during a game session for analytics and replay.

---

### 8. Lifelines Used Table
```sql
CREATE TABLE lifelines_used (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  lifeline_id INT REFERENCES lifelines(id),
  used_at TIMESTAMP DEFAULT now()
);
```
**Purpose**: Track which lifelines were used in each game for statistics.

---

### 9. High Scores/Leaderboard Table
```sql
CREATE TABLE high_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  prize_amount DECIMAL(15, 2),
  level_reached INT,
  game_date TIMESTAMP DEFAULT now()
);
```
**Purpose**: Maintain leaderboard of top scores and achievements.

---

## Entity Relationship Diagram

```
users (1) ──→ (many) game_sessions
             ├→ (many) high_scores
             
game_sessions (1) ──→ (many) game_progress
                  ├→ (many) lifelines_used
                  
difficulty_levels (1) ──→ (many) questions

questions (1) ──→ (many) answers
            ├→ (many) game_progress

lifelines (1) ──→ (many) lifelines_used

game_progress (many) ──→ (1) answers
```

---

## Key Features Supported

✅ **User Management** - Registration, authentication, player profiles
✅ **Progressive Difficulty** - 15 levels with increasing prize amounts
✅ **Question Bank** - Categorized questions at various difficulty levels
✅ **Lifelines** - 50:50, Phone a Friend, Ask Audience implementation
✅ **Game Sessions** - Track complete game history with questions and answers
✅ **Leaderboards** - Display top scores and achievements
✅ **Analytics** - Track player progress, lifeline usage patterns

---

## Installation

To implement this schema in Supabase:

1. Copy each SQL table creation script
2. Run them in Supabase SQL Editor in order (respect foreign key relationships)
3. Enable Row Level Security (RLS) policies for `users` and `game_sessions` tables
4. Create indexes on frequently queried columns (user_id, game_session_id, etc.)

---

## Notes

- All IDs use UUID except for lookup tables (difficulty_levels, lifelines)
- ON DELETE CASCADE ensures data consistency when sessions are deleted
- Timestamps are set to current UTC time by default
- Prize amounts use DECIMAL for financial accuracy
- Lifelines array stores IDs of used lifelines for easy tracking

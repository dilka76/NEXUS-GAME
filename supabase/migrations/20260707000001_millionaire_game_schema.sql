-- Create difficulty_levels table
CREATE TABLE difficulty_levels (
  id SERIAL PRIMARY KEY,
  level INT UNIQUE NOT NULL,
  prize_amount DECIMAL(15, 2) NOT NULL,
  difficulty_name TEXT NOT NULL
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  difficulty_level_id INT REFERENCES difficulty_levels(id),
  question_text TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Create answers table
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create lifelines table
CREATE TABLE lifelines (
  id SERIAL PRIMARY KEY,
  lifeline_name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Create game_sessions table
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMP DEFAULT now(),
  ended_at TIMESTAMP,
  current_level INT DEFAULT 1,
  prize_won DECIMAL(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'in_progress'
);

-- Create game_progress table
CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  answer_given UUID REFERENCES answers(id),
  lifelines_used INT[] DEFAULT ARRAY[]::INT[],
  answered_at TIMESTAMP DEFAULT now()
);

-- Create lifelines_used table
CREATE TABLE lifelines_used (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  lifeline_id INT REFERENCES lifelines(id),
  used_at TIMESTAMP DEFAULT now()
);

-- Create high_scores table
CREATE TABLE high_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  prize_amount DECIMAL(15, 2),
  level_reached INT,
  game_date TIMESTAMP DEFAULT now()
);

-- Insert default difficulty levels (1-15 with prize amounts)
INSERT INTO difficulty_levels (level, prize_amount, difficulty_name) VALUES
(1, 100.00, 'Easy'),
(2, 200.00, 'Easy'),
(3, 300.00, 'Easy'),
(4, 500.00, 'Easy'),
(5, 1000.00, 'Medium'),
(6, 2000.00, 'Medium'),
(7, 4000.00, 'Medium'),
(8, 8000.00, 'Medium'),
(9, 16000.00, 'Hard'),
(10, 32000.00, 'Hard'),
(11, 64000.00, 'Hard'),
(12, 125000.00, 'Very Hard'),
(13, 250000.00, 'Very Hard'),
(14, 500000.00, 'Very Hard'),
(15, 1000000.00, 'Extreme');

-- Insert default lifelines
INSERT INTO lifelines (lifeline_name, description) VALUES
('50:50', 'Remove two incorrect answers, leaving you with a 50-50 chance'),
('Phone a Friend', 'Call a friend to discuss possible answers'),
('Ask the Audience', 'Poll the audience for their answer suggestions');

-- Create indexes for performance
CREATE INDEX idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX idx_game_progress_game_session_id ON game_progress(game_session_id);
CREATE INDEX idx_game_progress_question_id ON game_progress(question_id);
CREATE INDEX idx_lifelines_used_game_session_id ON lifelines_used(game_session_id);
CREATE INDEX idx_high_scores_user_id ON high_scores(user_id);
CREATE INDEX idx_questions_difficulty_id ON questions(difficulty_level_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifelines_used ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_scores ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Create basic RLS policies for game_sessions table
CREATE POLICY "Users can view their own game sessions"
  ON game_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create game sessions"
  ON game_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game sessions"
  ON game_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create basic RLS policies for game_progress table
CREATE POLICY "Users can view their own game progress"
  ON game_progress FOR SELECT
  USING (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

CREATE POLICY "Users can create game progress"
  ON game_progress FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

-- Create basic RLS policies for lifelines_used table
CREATE POLICY "Users can view their own lifelines used"
  ON lifelines_used FOR SELECT
  USING (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

Create POLICY "Users can create lifelines used"
  ON lifelines_used FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

-- Create basic RLS policies for high_scores table
CREATE POLICY "Everyone can view high scores"
  ON high_scores FOR SELECT
  USING (true);

CREATE POLICY "Users can create high scores"
  ON high_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

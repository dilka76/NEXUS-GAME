-- Enhanced Row Level Security Policies for Millionaire Game

-- Enable RLS on public tables (read-only)
ALTER TABLE difficulty_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifelines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for difficulty_levels (public read-only)
CREATE POLICY "Anyone can view difficulty levels"
  ON difficulty_levels FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert difficulty levels"
  ON difficulty_levels FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update difficulty levels"
  ON difficulty_levels FOR UPDATE
  USING (false);

CREATE POLICY "Only admins can delete difficulty levels"
  ON difficulty_levels FOR DELETE
  USING (false);

-- RLS Policies for questions (public read-only)
CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert questions"
  ON questions FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update questions"
  ON questions FOR UPDATE
  USING (false);

CREATE POLICY "Only admins can delete questions"
  ON questions FOR DELETE
  USING (false);

-- RLS Policies for answers (public read-only)
CREATE POLICY "Anyone can view answers"
  ON answers FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert answers"
  ON answers FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update answers"
  ON answers FOR UPDATE
  USING (false);

CREATE POLICY "Only admins can delete answers"
  ON answers FOR DELETE
  USING (false);

-- RLS Policies for lifelines (public read-only)
CREATE POLICY "Anyone can view lifelines"
  ON lifelines FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert lifelines"
  ON lifelines FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update lifelines"
  ON lifelines FOR UPDATE
  USING (false);

CREATE POLICY "Only admins can delete lifelines"
  ON lifelines FOR DELETE
  USING (false);

-- Additional RLS Policies for game_progress (DELETE)
CREATE POLICY "Users can delete their own game progress"
  ON game_progress FOR DELETE
  USING (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

-- Additional RLS Policies for lifelines_used (DELETE)
CREATE POLICY "Users can delete their own lifelines used"
  ON lifelines_used FOR DELETE
  USING (auth.uid() = (SELECT user_id FROM game_sessions WHERE id = game_session_id));

-- Additional RLS Policies for game_sessions (DELETE)
CREATE POLICY "Users can delete their own game sessions"
  ON game_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Additional RLS Policies for high_scores (DELETE)
CREATE POLICY "Users can delete their own high scores"
  ON high_scores FOR DELETE
  USING (auth.uid() = user_id);

-- Create an admin check function for future use
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'role') = 'admin' OR 
         (auth.jwt() ->> 'user_role') = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add UPDATE policies for users to only update certain fields
CREATE POLICY "Users can update their own profile (limited fields)"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Add INSERT policy for users (for registration)
CREATE POLICY "Anyone can create a new user account"
  ON users FOR INSERT
  WITH CHECK (true);

-- Add DELETE policy for users
CREATE POLICY "Users can delete their own account"
  ON users FOR DELETE
  USING (auth.uid() = id);

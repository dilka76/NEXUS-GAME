-- Temporary: Disable RLS to allow seeding
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

-- Seed sample questions and answers for all 5 levels
-- Level 1: Easy (21 questions)
INSERT INTO questions (difficulty_level_id, question_text, category) VALUES
(1, 'What is the capital of France?', 'Geography'),
(1, 'How many sides does a triangle have?', 'Math'),
(1, 'What color is the sky on a clear day?', 'Nature'),
(1, 'Who wrote Romeo and Juliet?', 'Literature'),
(1, 'What is the largest planet in our solar system?', 'Science'),
(1, 'In what year did the Titanic sink?', 'History'),
(1, 'What is the smallest prime number?', 'Math'),
(1, 'Which continent is the largest by area?', 'Geography'),
(1, 'How many strings does a violin have?', 'Music'),
(1, 'What is the chemical symbol for gold?', 'Chemistry'),
(1, 'Who painted the Mona Lisa?', 'Art'),
(1, 'How many minutes are in a day?', 'Math'),
(1, 'What is the capital of Japan?', 'Geography'),
(1, 'Which planet is known as the Red Planet?', 'Science'),
(1, 'How many continents are there?', 'Geography'),
(1, 'What is the fastest land animal?', 'Nature'),
(1, 'In what year was the internet invented?', 'Technology'),
(1, 'What is the hardest natural substance?', 'Science'),
(1, 'How many days are in February in a leap year?', 'Calendar'),
(1, 'What is the capital of Australia?', 'Geography'),
(1, 'Which animal is the tallest living land animal?', 'Nature');

-- Re-enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Seed questions for Level 2 (Intermediate difficulty)

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;

-- Level 2: Intermediate (21 questions)
INSERT INTO questions (difficulty_level_id, question_text, category) VALUES
(2, 'Which element has the atomic number 26?', 'Chemistry'),
(2, 'What is the capital of Brazil?', 'Geography'),
(2, 'Who invented the light bulb?', 'History'),
(2, 'What is the derivative of x^2?', 'Math'),
(2, 'Which of these artists belonged to the Renaissance?', 'Art'),
(2, 'What is the boiling point of water at sea level?', 'Physics'),
(2, 'Which country is the world''s largest exporter of coffee?', 'Geography'),
(2, 'Who was the first President of the United States?', 'History'),
(2, 'What is the speed of light in vacuum?', 'Physics'),
(2, 'Which ocean is the largest?', 'Geography'),
(2, 'Who wrote the novel "1984"?', 'Literature'),
(2, 'What is the square root of 144?', 'Math'),
(2, 'Which protein carries oxygen in red blood cells?', 'Biology'),
(2, 'What is the capital of Egypt?', 'Geography'),
(2, 'Who composed the symphony "Moonlight Sonata"?', 'Music'),
(2, 'What is the process by which plants make their own food?', 'Biology'),
(2, 'Which country has the most time zones?', 'Geography'),
(2, 'What is the chemical formula for sulfuric acid?', 'Chemistry'),
(2, 'Who directed the film "Titanic"?', 'Film'),
(2, 'What is the smallest country in the world by area?', 'Geography'),
(2, 'In what year did the Berlin Wall fall?', 'History');

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

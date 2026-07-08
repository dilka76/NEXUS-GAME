-- Seed questions for Level 4 (Hard difficulty)

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;

-- Level 4: Hard (21 questions)
INSERT INTO questions (difficulty_level_id, question_text, category) VALUES
(4, 'What is the only mammal that cannot jump?', 'Biology'),
(4, 'In what year did the first iPhone release?', 'Technology'),
(4, 'Which scientist discovered the laws of motion and gravity?', 'Science'),
(4, 'What is the capital of South Sudan?', 'Geography'),
(4, 'Who wrote "Ulysses"?', 'Literature'),
(4, 'What is the Avogadro constant approximately equal to?', 'Chemistry'),
(4, 'In what year did the Russian Revolution occur?', 'History'),
(4, 'Which protein is responsible for muscle contraction?', 'Biology'),
(4, 'What is the wavelength of visible light in nanometers?', 'Physics'),
(4, 'Who composed the opera "The Magic Flute"?', 'Music'),
(4, 'What is the capital of Mongolia?', 'Geography'),
(4, 'Which country was split into North and South Korea?', 'History'),
(4, 'What is the Pauli Exclusion Principle?', 'Physics'),
(4, 'Who created the first successful airplane?', 'History'),
(4, 'What is the significance of the number "prime" in mathematics?', 'Math'),
(4, 'Which biologist proposed the theory of natural selection?', 'Biology'),
(4, 'What is the capital of Kyrgyzstan?', 'Geography'),
(4, 'Who wrote "Metamorphosis"?', 'Literature'),
(4, 'What is the study of fossils called?', 'Science'),
(4, 'In what year did the Titanic sink?', 'History'),
(4, 'What is the most electronegative element on the periodic table?', 'Chemistry');

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

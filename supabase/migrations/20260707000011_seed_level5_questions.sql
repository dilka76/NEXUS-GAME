-- Seed questions for Level 5 (Expert difficulty)

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;

-- Level 5: Expert (21 questions)
INSERT INTO questions (difficulty_level_id, question_text, category) VALUES
(5, 'What is the name of the hypothetical particle that mediates quantum entanglement?', 'Physics'),
(5, 'Which ancient civilization created the first written code of laws?', 'History'),
(5, 'What is the Turing completeness in computational theory?', 'Mathematics'),
(5, 'Who discovered the structure of DNA in 1952?', 'Science'),
(5, 'What is the capital of Turkmenistan?', 'Geography'),
(5, 'In what year did the Cuban Missile Crisis occur?', 'History'),
(5, 'Which economist developed the theory of comparative advantage?', 'Economics'),
(5, 'What is the Planck constant approximately equal to?', 'Physics'),
(5, 'Who wrote "One Hundred Years of Solitude"?', 'Literature'),
(5, 'What is the study of language structure called?', 'Linguistics'),
(5, 'In what year did the first moon landing occur?', 'History'),
(5, 'Which philosopher developed the concept of categorical imperative?', 'Philosophy'),
(5, 'What is the Chandrasekhar limit in astrophysics?', 'Science'),
(5, 'Who discovered the top quark?', 'Physics'),
(5, 'What is the capital of Tajikistan?', 'Geography'),
(5, 'In what year did the fall of the Soviet Union occur?', 'History'),
(5, 'Which artist created "A Sunday Afternoon on the Island of La Grande Jatte"?', 'Art'),
(5, 'What is the Gödel incompleteness theorem?', 'Mathematics'),
(5, 'Who was the first European explorer to sail around the Cape of Good Hope?', 'History'),
(5, 'What is the significance of the number "phi" in mathematics?', 'Mathematics'),
(5, 'In what year did the Industrial Revolution begin?', 'History');

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Seed questions for Level 3 (Medium-Hard difficulty)

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;

-- Level 3: Medium-Hard (21 questions)
INSERT INTO questions (difficulty_level_id, question_text, category) VALUES
(3, 'What is the capital of Kazakhstan?', 'Geography'),
(3, 'Who wrote "The Great Gatsby"?', 'Literature'),
(3, 'What is the most abundant element in the Earth''s atmosphere?', 'Chemistry'),
(3, 'In what year did World War II end?', 'History'),
(3, 'What is the integral of 2x dx?', 'Math'),
(3, 'Which country hosted the 2020 Olympics?', 'Sports'),
(3, 'What is the chemical formula for table salt?', 'Chemistry'),
(3, 'Who was the longest reigning British monarch before Queen Elizabeth II?', 'History'),
(3, 'What is the Hubble constant related to in astronomy?', 'Science'),
(3, 'Which organ produces insulin?', 'Biology'),
(3, 'What is the capital of Norway?', 'Geography'),
(3, 'Who painted "The Starry Night"?', 'Art'),
(3, 'What is the most spoken language by native speakers?', 'Culture'),
(3, 'In what year did the Challenger space shuttle disaster occur?', 'History'),
(3, 'What is the SI unit of electric current?', 'Physics'),
(3, 'Which country has the most lakes?', 'Geography'),
(3, 'What is the genetic material found in all living organisms?', 'Biology'),
(3, 'Who wrote "Crime and Punishment"?', 'Literature'),
(3, 'What is the atomic number of carbon?', 'Chemistry'),
(3, 'Which river is the longest in Africa?', 'Geography'),
(3, 'What is the process of DNA replication called?', 'Biology');

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

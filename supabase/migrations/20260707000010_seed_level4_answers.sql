-- Seed answers for Level 4 questions

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

WITH q1 AS (SELECT id FROM questions WHERE question_text = 'What is the only mammal that cannot jump?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q1.id, * FROM (VALUES ('Elephant', true), ('Hippopotamus', false), ('Rhinoceros', false), ('Whale', false)) AS t(text, correct), q1;

WITH q2 AS (SELECT id FROM questions WHERE question_text = 'In what year did the first iPhone release?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q2.id, * FROM (VALUES ('2007', true), ('2006', false), ('2008', false), ('2005', false)) AS t(text, correct), q2;

WITH q3 AS (SELECT id FROM questions WHERE question_text = 'Which scientist discovered the laws of motion and gravity?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q3.id, * FROM (VALUES ('Isaac Newton', true), ('Galileo Galilei', false), ('Johannes Kepler', false), ('Tycho Brahe', false)) AS t(text, correct), q3;

WITH q4 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of South Sudan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q4.id, * FROM (VALUES ('Juba', true), ('Khartoum', false), ('Malakal', false), ('Wau', false)) AS t(text, correct), q4;

WITH q5 AS (SELECT id FROM questions WHERE question_text = 'Who wrote "Ulysses"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q5.id, * FROM (VALUES ('James Joyce', true), ('T.S. Eliot', false), ('Ezra Pound', false), ('William Faulkner', false)) AS t(text, correct), q5;

WITH q6 AS (SELECT id FROM questions WHERE question_text = 'What is the Avogadro constant approximately equal to?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q6.id, * FROM (VALUES ('6.022 × 10^23', true), ('3.14 × 10^23', false), ('9.81 × 10^23', false), ('2.998 × 10^23', false)) AS t(text, correct), q6;

WITH q7 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Russian Revolution occur?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q7.id, * FROM (VALUES ('1917', true), ('1915', false), ('1919', false), ('1920', false)) AS t(text, correct), q7;

WITH q8 AS (SELECT id FROM questions WHERE question_text = 'Which protein is responsible for muscle contraction?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q8.id, * FROM (VALUES ('Actin', true), ('Collagen', false), ('Keratin', false), ('Elastin', false)) AS t(text, correct), q8;

WITH q9 AS (SELECT id FROM questions WHERE question_text = 'What is the wavelength of visible light in nanometers?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q9.id, * FROM (VALUES ('400-700 nm', true), ('100-200 nm', false), ('800-900 nm', false), ('200-300 nm', false)) AS t(text, correct), q9;

WITH q10 AS (SELECT id FROM questions WHERE question_text = 'Who composed the opera "The Magic Flute"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q10.id, * FROM (VALUES ('Wolfgang Amadeus Mozart', true), ('Giuseppe Verdi', false), ('Georges Bizet', false), ('Richard Wagner', false)) AS t(text, correct), q10;

WITH q11 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Mongolia?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q11.id, * FROM (VALUES ('Ulaanbaatar', true), ('Darkhan', false), ('Erdenet', false), ('Choibalsan', false)) AS t(text, correct), q11;

WITH q12 AS (SELECT id FROM questions WHERE question_text = 'Which country was split into North and South Korea?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q12.id, * FROM (VALUES ('Korea', true), ('Vietnam', false), ('China', false), ('Manchuria', false)) AS t(text, correct), q12;

WITH q13 AS (SELECT id FROM questions WHERE question_text = 'What is the Pauli Exclusion Principle?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q13.id, * FROM (VALUES ('No two fermions can occupy the same quantum state', true), ('Energy cannot be created or destroyed', false), ('Objects fall at same rate in vacuum', false), ('Heat flows from hot to cold', false)) AS t(text, correct), q13;

WITH q14 AS (SELECT id FROM questions WHERE question_text = 'Who created the first successful airplane?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q14.id, * FROM (VALUES ('Wright Brothers', true), ('Glenn Curtiss', false), ('Samuel Langley', false), ('Otto Lilienthal', false)) AS t(text, correct), q14;

WITH q15 AS (SELECT id FROM questions WHERE question_text = 'What is the significance of the number "prime" in mathematics?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q15.id, * FROM (VALUES ('Divisible only by 1 and itself', true), ('Greater than 1', false), ('Always odd', false), ('Sum of two numbers', false)) AS t(text, correct), q15;

WITH q16 AS (SELECT id FROM questions WHERE question_text = 'Which biologist proposed the theory of natural selection?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q16.id, * FROM (VALUES ('Charles Darwin', true), ('Jean-Baptiste Lamarck', false), ('Gregor Mendel', false), ('Louis Pasteur', false)) AS t(text, correct), q16;

WITH q17 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Kyrgyzstan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q17.id, * FROM (VALUES ('Bishkek', true), ('Osh', false), ('Jalal-Abad', false), ('Karakol', false)) AS t(text, correct), q17;

WITH q18 AS (SELECT id FROM questions WHERE question_text = 'Who wrote "Metamorphosis"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q18.id, * FROM (VALUES ('Franz Kafka', true), ('Max Frisch', false), ('Hermann Hesse', false), ('Robert Musil', false)) AS t(text, correct), q18;

WITH q19 AS (SELECT id FROM questions WHERE question_text = 'What is the study of fossils called?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q19.id, * FROM (VALUES ('Paleontology', true), ('Archaeology', false), ('Geology', false), ('Anthropology', false)) AS t(text, correct), q19;

WITH q20 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Titanic sink?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q20.id, * FROM (VALUES ('1912', true), ('1910', false), ('1915', false), ('1920', false)) AS t(text, correct), q20;

WITH q21 AS (SELECT id FROM questions WHERE question_text = 'What is the most electronegative element on the periodic table?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q21.id, * FROM (VALUES ('Fluorine', true), ('Chlorine', false), ('Oxygen', false), ('Nitrogen', false)) AS t(text, correct), q21;

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

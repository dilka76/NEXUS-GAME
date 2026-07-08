-- Seed answers for Level 3 questions

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

WITH q1 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Kazakhstan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q1.id, * FROM (VALUES ('Astana', true), ('Almaty', false), ('Karaganda', false), ('Shymkent', false)) AS t(text, correct), q1;

WITH q2 AS (SELECT id FROM questions WHERE question_text = 'Who wrote "The Great Gatsby"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q2.id, * FROM (VALUES ('F. Scott Fitzgerald', true), ('Ernest Hemingway', false), ('John Steinbeck', false), ('Sinclair Lewis', false)) AS t(text, correct), q2;

WITH q3 AS (SELECT id FROM questions WHERE question_text = 'What is the most abundant element in the Earth''s atmosphere?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q3.id, * FROM (VALUES ('Nitrogen', true), ('Oxygen', false), ('Argon', false), ('Carbon Dioxide', false)) AS t(text, correct), q3;

WITH q4 AS (SELECT id FROM questions WHERE question_text = 'In what year did World War II end?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q4.id, * FROM (VALUES ('1945', true), ('1944', false), ('1946', false), ('1943', false)) AS t(text, correct), q4;

WITH q5 AS (SELECT id FROM questions WHERE question_text = 'What is the integral of 2x dx?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q5.id, * FROM (VALUES ('x^2 + C', true), ('2x + C', false), ('x + C', false), ('2x^2 + C', false)) AS t(text, correct), q5;

WITH q6 AS (SELECT id FROM questions WHERE question_text = 'Which country hosted the 2020 Olympics?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q6.id, * FROM (VALUES ('Japan', true), ('South Korea', false), ('Brazil', false), ('China', false)) AS t(text, correct), q6;

WITH q7 AS (SELECT id FROM questions WHERE question_text = 'What is the chemical formula for table salt?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q7.id, * FROM (VALUES ('NaCl', true), ('KCl', false), ('MgCl2', false), ('CaCl2', false)) AS t(text, correct), q7;

WITH q8 AS (SELECT id FROM questions WHERE question_text = 'Who was the longest reigning British monarch before Queen Elizabeth II?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q8.id, * FROM (VALUES ('King George III', true), ('King George V', false), ('King Edward VII', false), ('King William IV', false)) AS t(text, correct), q8;

WITH q9 AS (SELECT id FROM questions WHERE question_text = 'What is the Hubble constant related to in astronomy?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q9.id, * FROM (VALUES ('Universe expansion rate', true), ('Black hole gravity', false), ('Star temperature', false), ('Planetary motion', false)) AS t(text, correct), q9;

WITH q10 AS (SELECT id FROM questions WHERE question_text = 'Which organ produces insulin?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q10.id, * FROM (VALUES ('Pancreas', true), ('Liver', false), ('Thyroid', false), ('Adrenal gland', false)) AS t(text, correct), q10;

WITH q11 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Norway?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q11.id, * FROM (VALUES ('Oslo', true), ('Bergen', false), ('Stavanger', false), ('Trondheim', false)) AS t(text, correct), q11;

WITH q12 AS (SELECT id FROM questions WHERE question_text = 'Who painted "The Starry Night"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q12.id, * FROM (VALUES ('Vincent van Gogh', true), ('Paul Gauguin', false), ('Henri de Toulouse-Lautrec', false), ('Edvard Munch', false)) AS t(text, correct), q12;

WITH q13 AS (SELECT id FROM questions WHERE question_text = 'What is the most spoken language by native speakers?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q13.id, * FROM (VALUES ('Mandarin Chinese', true), ('Spanish', false), ('English', false), ('Hindi', false)) AS t(text, correct), q13;

WITH q14 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Challenger space shuttle disaster occur?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q14.id, * FROM (VALUES ('1986', true), ('1985', false), ('1987', false), ('1988', false)) AS t(text, correct), q14;

WITH q15 AS (SELECT id FROM questions WHERE question_text = 'What is the SI unit of electric current?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q15.id, * FROM (VALUES ('Ampere', true), ('Volt', false), ('Watt', false), ('Ohm', false)) AS t(text, correct), q15;

WITH q16 AS (SELECT id FROM questions WHERE question_text = 'Which country has the most lakes?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q16.id, * FROM (VALUES ('Canada', true), ('Russia', false), ('Finland', false), ('Sweden', false)) AS t(text, correct), q16;

WITH q17 AS (SELECT id FROM questions WHERE question_text = 'What is the genetic material found in all living organisms?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q17.id, * FROM (VALUES ('DNA', true), ('RNA', false), ('Protein', false), ('Lipid', false)) AS t(text, correct), q17;

WITH q18 AS (SELECT id FROM questions WHERE question_text = 'Who wrote "Crime and Punishment"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q18.id, * FROM (VALUES ('Fyodor Dostoevsky', true), ('Leo Tolstoy', false), ('Anton Chekhov', false), ('Ivan Turgenev', false)) AS t(text, correct), q18;

WITH q19 AS (SELECT id FROM questions WHERE question_text = 'What is the atomic number of carbon?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q19.id, * FROM (VALUES ('6', true), ('4', false), ('8', false), ('5', false)) AS t(text, correct), q19;

WITH q20 AS (SELECT id FROM questions WHERE question_text = 'Which river is the longest in Africa?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q20.id, * FROM (VALUES ('Nile', true), ('Congo', false), ('Zambezi', false), ('Niger', false)) AS t(text, correct), q20;

WITH q21 AS (SELECT id FROM questions WHERE question_text = 'What is the process of DNA replication called?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q21.id, * FROM (VALUES ('Semi-conservative replication', true), ('Mutation', false), ('Transcription', false), ('Translation', false)) AS t(text, correct), q21;

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

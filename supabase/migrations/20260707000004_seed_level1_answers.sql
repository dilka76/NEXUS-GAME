-- Seed answers for Level 1 questions and insert all remaining levels

-- Temporarily disable RLS
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

-- Insert answers for Level 1 questions
WITH q1 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of France?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q1.id, * FROM (VALUES ('Paris', true), ('London', false), ('Berlin', false), ('Madrid', false)) AS t(text, correct), q1;

WITH q2 AS (SELECT id FROM questions WHERE question_text = 'How many sides does a triangle have?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q2.id, * FROM (VALUES ('3', true), ('4', false), ('5', false), ('6', false)) AS t(text, correct), q2;

WITH q3 AS (SELECT id FROM questions WHERE question_text = 'What color is the sky on a clear day?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q3.id, * FROM (VALUES ('Blue', true), ('Green', false), ('Yellow', false), ('Red', false)) AS t(text, correct), q3;

WITH q4 AS (SELECT id FROM questions WHERE question_text = 'Who wrote Romeo and Juliet?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q4.id, * FROM (VALUES ('William Shakespeare', true), ('Jane Austen', false), ('Charles Dickens', false), ('Mark Twain', false)) AS t(text, correct), q4;

WITH q5 AS (SELECT id FROM questions WHERE question_text = 'What is the largest planet in our solar system?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q5.id, * FROM (VALUES ('Jupiter', true), ('Saturn', false), ('Neptune', false), ('Mars', false)) AS t(text, correct), q5;

WITH q6 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Titanic sink?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q6.id, * FROM (VALUES ('1912', true), ('1905', false), ('1920', false), ('1898', false)) AS t(text, correct), q6;

WITH q7 AS (SELECT id FROM questions WHERE question_text = 'What is the smallest prime number?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q7.id, * FROM (VALUES ('2', true), ('1', false), ('3', false), ('0', false)) AS t(text, correct), q7;

WITH q8 AS (SELECT id FROM questions WHERE question_text = 'Which continent is the largest by area?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q8.id, * FROM (VALUES ('Asia', true), ('Africa', false), ('Europe', false), ('Australia', false)) AS t(text, correct), q8;

WITH q9 AS (SELECT id FROM questions WHERE question_text = 'How many strings does a violin have?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q9.id, * FROM (VALUES ('4', true), ('3', false), ('5', false), ('6', false)) AS t(text, correct), q9;

WITH q10 AS (SELECT id FROM questions WHERE question_text = 'What is the chemical symbol for gold?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q10.id, * FROM (VALUES ('Au', true), ('Gd', false), ('Go', false), ('Ag', false)) AS t(text, correct), q10;

WITH q11 AS (SELECT id FROM questions WHERE question_text = 'Who painted the Mona Lisa?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q11.id, * FROM (VALUES ('Leonardo da Vinci', true), ('Michelangelo', false), ('Raphael', false), ('Donatello', false)) AS t(text, correct), q11;

WITH q12 AS (SELECT id FROM questions WHERE question_text = 'How many minutes are in a day?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q12.id, * FROM (VALUES ('1440', true), ('1200', false), ('1800', false), ('2400', false)) AS t(text, correct), q12;

WITH q13 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Japan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q13.id, * FROM (VALUES ('Tokyo', true), ('Osaka', false), ('Kyoto', false), ('Nagano', false)) AS t(text, correct), q13;

WITH q14 AS (SELECT id FROM questions WHERE question_text = 'Which planet is known as the Red Planet?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q14.id, * FROM (VALUES ('Mars', true), ('Venus', false), ('Mercury', false), ('Jupiter', false)) AS t(text, correct), q14;

WITH q15 AS (SELECT id FROM questions WHERE question_text = 'How many continents are there?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q15.id, * FROM (VALUES ('7', true), ('6', false), ('5', false), ('8', false)) AS t(text, correct), q15;

WITH q16 AS (SELECT id FROM questions WHERE question_text = 'What is the fastest land animal?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q16.id, * FROM (VALUES ('Cheetah', true), ('Lion', false), ('Gazelle', false), ('Greyhound', false)) AS t(text, correct), q16;

WITH q17 AS (SELECT id FROM questions WHERE question_text = 'In what year was the internet invented?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q17.id, * FROM (VALUES ('1983', true), ('1975', false), ('1990', false), ('2000', false)) AS t(text, correct), q17;

WITH q18 AS (SELECT id FROM questions WHERE question_text = 'What is the hardest natural substance?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q18.id, * FROM (VALUES ('Diamond', true), ('Sapphire', false), ('Ruby', false), ('Quartz', false)) AS t(text, correct), q18;

WITH q19 AS (SELECT id FROM questions WHERE question_text = 'How many days are in February in a leap year?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q19.id, * FROM (VALUES ('29', true), ('28', false), ('30', false), ('31', false)) AS t(text, correct), q19;

WITH q20 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Australia?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q20.id, * FROM (VALUES ('Canberra', true), ('Sydney', false), ('Melbourne', false), ('Brisbane', false)) AS t(text, correct), q20;

WITH q21 AS (SELECT id FROM questions WHERE question_text = 'Which animal is the tallest living land animal?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q21.id, * FROM (VALUES ('Giraffe', true), ('Elephant', false), ('Ostrich', false), ('Moose', false)) AS t(text, correct), q21;

-- Re-enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

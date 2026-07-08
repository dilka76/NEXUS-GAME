-- Seed answers for Level 2 questions

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

WITH q1 AS (SELECT id FROM questions WHERE question_text = 'Which element has the atomic number 26?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q1.id, * FROM (VALUES ('Iron', true), ('Zinc', false), ('Copper', false), ('Cobalt', false)) AS t(text, correct), q1;

WITH q2 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Brazil?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q2.id, * FROM (VALUES ('Brasília', true), ('Rio de Janeiro', false), ('São Paulo', false), ('Salvador', false)) AS t(text, correct), q2;

WITH q3 AS (SELECT id FROM questions WHERE question_text = 'Who invented the light bulb?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q3.id, * FROM (VALUES ('Thomas Edison', true), ('Nikola Tesla', false), ('Alexander Graham Bell', false), ('Benjamin Franklin', false)) AS t(text, correct), q3;

WITH q4 AS (SELECT id FROM questions WHERE question_text = 'What is the derivative of x^2?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q4.id, * FROM (VALUES ('2x', true), ('x', false), ('2', false), ('x^3', false)) AS t(text, correct), q4;

WITH q5 AS (SELECT id FROM questions WHERE question_text = 'Which of these artists belonged to the Renaissance?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q5.id, * FROM (VALUES ('Leonardo da Vinci', true), ('Pablo Picasso', false), ('Claude Monet', false), ('Vincent van Gogh', false)) AS t(text, correct), q5;

WITH q6 AS (SELECT id FROM questions WHERE question_text = 'What is the boiling point of water at sea level?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q6.id, * FROM (VALUES ('100°C', true), ('90°C', false), ('110°C', false), ('80°C', false)) AS t(text, correct), q6;

WITH q7 AS (SELECT id FROM questions WHERE question_text = 'Which country is the world''s largest exporter of coffee?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q7.id, * FROM (VALUES ('Brazil', true), ('Vietnam', false), ('Colombia', false), ('Indonesia', false)) AS t(text, correct), q7;

WITH q8 AS (SELECT id FROM questions WHERE question_text = 'Who was the first President of the United States?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q8.id, * FROM (VALUES ('George Washington', true), ('Thomas Jefferson', false), ('Benjamin Franklin', false), ('John Adams', false)) AS t(text, correct), q8;

WITH q9 AS (SELECT id FROM questions WHERE question_text = 'What is the speed of light in vacuum?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q9.id, * FROM (VALUES ('299,792,458 m/s', true), ('200,000,000 m/s', false), ('350,000,000 m/s', false), ('250,000,000 m/s', false)) AS t(text, correct), q9;

WITH q10 AS (SELECT id FROM questions WHERE question_text = 'Which ocean is the largest?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q10.id, * FROM (VALUES ('Pacific', true), ('Atlantic', false), ('Indian', false), ('Arctic', false)) AS t(text, correct), q10;

WITH q11 AS (SELECT id FROM questions WHERE question_text = 'Who wrote the novel "1984"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q11.id, * FROM (VALUES ('George Orwell', true), ('Aldous Huxley', false), ('H.G. Wells', false), ('Ray Bradbury', false)) AS t(text, correct), q11;

WITH q12 AS (SELECT id FROM questions WHERE question_text = 'What is the square root of 144?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q12.id, * FROM (VALUES ('12', true), ('10', false), ('13', false), ('11', false)) AS t(text, correct), q12;

WITH q13 AS (SELECT id FROM questions WHERE question_text = 'Which protein carries oxygen in red blood cells?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q13.id, * FROM (VALUES ('Hemoglobin', true), ('Myoglobin', false), ('Albumin', false), ('Keratin', false)) AS t(text, correct), q13;

WITH q14 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Egypt?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q14.id, * FROM (VALUES ('Cairo', true), ('Alexandria', false), ('Giza', false), ('Luxor', false)) AS t(text, correct), q14;

WITH q15 AS (SELECT id FROM questions WHERE question_text = 'Who composed the symphony "Moonlight Sonata"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q15.id, * FROM (VALUES ('Ludwig van Beethoven', true), ('Wolfgang Amadeus Mozart', false), ('Johann Sebastian Bach', false), ('Frédéric Chopin', false)) AS t(text, correct), q15;

WITH q16 AS (SELECT id FROM questions WHERE question_text = 'What is the process by which plants make their own food?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q16.id, * FROM (VALUES ('Photosynthesis', true), ('Respiration', false), ('Fermentation', false), ('Chemosynthesis', false)) AS t(text, correct), q16;

WITH q17 AS (SELECT id FROM questions WHERE question_text = 'Which country has the most time zones?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q17.id, * FROM (VALUES ('France', true), ('Russia', false), ('United States', false), ('Canada', false)) AS t(text, correct), q17;

WITH q18 AS (SELECT id FROM questions WHERE question_text = 'What is the chemical formula for sulfuric acid?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q18.id, * FROM (VALUES ('H2SO4', true), ('H2SO3', false), ('H2S', false), ('SO4', false)) AS t(text, correct), q18;

WITH q19 AS (SELECT id FROM questions WHERE question_text = 'Who directed the film "Titanic"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q19.id, * FROM (VALUES ('James Cameron', true), ('Steven Spielberg', false), ('Martin Scorsese', false), ('Christopher Nolan', false)) AS t(text, correct), q19;

WITH q20 AS (SELECT id FROM questions WHERE question_text = 'What is the smallest country in the world by area?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q20.id, * FROM (VALUES ('Vatican City', true), ('Monaco', false), ('San Marino', false), ('Liechtenstein', false)) AS t(text, correct), q20;

WITH q21 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Berlin Wall fall?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q21.id, * FROM (VALUES ('1989', true), ('1987', false), ('1991', false), ('1985', false)) AS t(text, correct), q21;

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

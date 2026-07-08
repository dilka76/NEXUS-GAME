-- Seed answers for Level 5 questions

ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE answers DISABLE ROW LEVEL SECURITY;

WITH q1 AS (SELECT id FROM questions WHERE question_text = 'What is the name of the hypothetical particle that mediates quantum entanglement?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q1.id, * FROM (VALUES ('Quanton', true), ('Entanglon', false), ('Quantron', false), ('Spookon', false)) AS t(text, correct), q1;

WITH q2 AS (SELECT id FROM questions WHERE question_text = 'Which ancient civilization created the first written code of laws?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q2.id, * FROM (VALUES ('Babylon', true), ('Egypt', false), ('Rome', false), ('Greece', false)) AS t(text, correct), q2;

WITH q3 AS (SELECT id FROM questions WHERE question_text = 'What is the Turing completeness in computational theory?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q3.id, * FROM (VALUES ('Ability to compute any computable function', true), ('Speed of computation', false), ('Memory capacity', false), ('Processing power', false)) AS t(text, correct), q3;

WITH q4 AS (SELECT id FROM questions WHERE question_text = 'Who discovered the structure of DNA in 1952?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q4.id, * FROM (VALUES ('Rosalind Franklin', true), ('James Watson', false), ('Francis Crick', false), ('Maurice Wilkins', false)) AS t(text, correct), q4;

WITH q5 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Turkmenistan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q5.id, * FROM (VALUES ('Ashgabat', true), ('Turkmenbashi', false), ('Dashoguz', false), ('Mary', false)) AS t(text, correct), q5;

WITH q6 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Cuban Missile Crisis occur?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q6.id, * FROM (VALUES ('1962', true), ('1960', false), ('1964', false), ('1961', false)) AS t(text, correct), q6;

WITH q7 AS (SELECT id FROM questions WHERE question_text = 'Which economist developed the theory of comparative advantage?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q7.id, * FROM (VALUES ('David Ricardo', true), ('Adam Smith', false), ('Karl Marx', false), ('John Maynard Keynes', false)) AS t(text, correct), q7;

WITH q8 AS (SELECT id FROM questions WHERE question_text = 'What is the Planck constant approximately equal to?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q8.id, * FROM (VALUES ('6.626 × 10^-34 J⋅s', true), ('3.14 × 10^-34 J⋅s', false), ('9.81 × 10^-34 J⋅s', false), ('2.998 × 10^-34 J⋅s', false)) AS t(text, correct), q8;

WITH q9 AS (SELECT id FROM questions WHERE question_text = 'Who wrote "One Hundred Years of Solitude"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q9.id, * FROM (VALUES ('Gabriel García Márquez', true), ('Jorge Luis Borges', false), ('Julio Cortázar', false), ('Carlos Fuentes', false)) AS t(text, correct), q9;

WITH q10 AS (SELECT id FROM questions WHERE question_text = 'What is the study of language structure called?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q10.id, * FROM (VALUES ('Syntax', true), ('Semantics', false), ('Phonetics', false), ('Pragmatics', false)) AS t(text, correct), q10;

WITH q11 AS (SELECT id FROM questions WHERE question_text = 'In what year did the first moon landing occur?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q11.id, * FROM (VALUES ('1969', true), ('1967', false), ('1971', false), ('1968', false)) AS t(text, correct), q11;

WITH q12 AS (SELECT id FROM questions WHERE question_text = 'Which philosopher developed the concept of categorical imperative?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q12.id, * FROM (VALUES ('Immanuel Kant', true), ('Friedrich Nietzsche', false), ('Arthur Schopenhauer', false), ('Georg Hegel', false)) AS t(text, correct), q12;

WITH q13 AS (SELECT id FROM questions WHERE question_text = 'What is the Chandrasekhar limit in astrophysics?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q13.id, * FROM (VALUES ('Maximum mass of a white dwarf', true), ('Speed of black hole rotation', false), ('Event horizon size', false), ('Neutron star density', false)) AS t(text, correct), q13;

WITH q14 AS (SELECT id FROM questions WHERE question_text = 'Who discovered the top quark?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q14.id, * FROM (VALUES ('Fermilab team', true), ('CERN team', false), ('Stanford team', false), ('Princeton team', false)) AS t(text, correct), q14;

WITH q15 AS (SELECT id FROM questions WHERE question_text = 'What is the capital of Tajikistan?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q15.id, * FROM (VALUES ('Dushanbe', true), ('Khujand', false), ('Kulob', false), ('Qurghonteppa', false)) AS t(text, correct), q15;

WITH q16 AS (SELECT id FROM questions WHERE question_text = 'In what year did the fall of the Soviet Union occur?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q16.id, * FROM (VALUES ('1991', true), ('1989', false), ('1990', false), ('1992', false)) AS t(text, correct), q16;

WITH q17 AS (SELECT id FROM questions WHERE question_text = 'Which artist created "A Sunday Afternoon on the Island of La Grande Jatte"?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q17.id, * FROM (VALUES ('Georges Seurat', true), ('Claude Monet', false), ('Paul Cézanne', false), ('Henri Matisse', false)) AS t(text, correct), q17;

WITH q18 AS (SELECT id FROM questions WHERE question_text = 'What is the Gödel incompleteness theorem?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q18.id, * FROM (VALUES ('No consistent system can prove its own consistency', true), ('All mathematical truths are provable', false), ('Mathematics is complete and consistent', false), ('Axioms are self-evident truths', false)) AS t(text, correct), q18;

WITH q19 AS (SELECT id FROM questions WHERE question_text = 'Who was the first European explorer to sail around the Cape of Good Hope?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q19.id, * FROM (VALUES ('Bartolomeu Dias', true), ('Vasco da Gama', false), ('Christopher Columbus', false), ('Ferdinand Magellan', false)) AS t(text, correct), q19;

WITH q20 AS (SELECT id FROM questions WHERE question_text = 'What is the significance of the number "phi" in mathematics?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q20.id, * FROM (VALUES ('The golden ratio', true), ('Euler''s number', false), ('Pi ratio', false), ('Euler-Mascheroni constant', false)) AS t(text, correct), q20;

WITH q21 AS (SELECT id FROM questions WHERE question_text = 'In what year did the Industrial Revolution begin?' LIMIT 1)
INSERT INTO answers (question_id, answer_text, is_correct) SELECT q21.id, * FROM (VALUES ('1760', true), ('1750', false), ('1770', false), ('1780', false)) AS t(text, correct), q21;

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

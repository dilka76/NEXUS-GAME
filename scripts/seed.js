/**
 * Seed Script for Millionaire Game Database
 * 
 * This script generates:
 * - 5 game difficulty levels (1-5, from easiest to hardest)
 * - 21 trivia questions for each level
 * - 4 answer options per question (1 correct, 3 incorrect)
 * 
 * Usage: node scripts/seed.js
 */

import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Sample trivia questions by difficulty level
const trivia = {
  1: [
    {
      question: "What is the capital of France?",
      correct: "Paris",
      wrong: ["London", "Berlin", "Madrid"],
      category: "Geography",
    },
    {
      question: "How many sides does a triangle have?",
      correct: "3",
      wrong: ["4", "5", "6"],
      category: "Math",
    },
    {
      question: "What color is the sky on a clear day?",
      correct: "Blue",
      wrong: ["Green", "Yellow", "Red"],
      category: "Nature",
    },
    {
      question: "Who wrote Romeo and Juliet?",
      correct: "William Shakespeare",
      wrong: ["Jane Austen", "Charles Dickens", "Mark Twain"],
      category: "Literature",
    },
    {
      question: "What is the largest planet in our solar system?",
      correct: "Jupiter",
      wrong: ["Saturn", "Neptune", "Mars"],
      category: "Science",
    },
    {
      question: "In what year did the Titanic sink?",
      correct: "1912",
      wrong: ["1905", "1920", "1898"],
      category: "History",
    },
    {
      question: "What is the smallest prime number?",
      correct: "2",
      wrong: ["1", "3", "0"],
      category: "Math",
    },
    {
      question: "Which continent is the largest by area?",
      correct: "Asia",
      wrong: ["Africa", "Europe", "Australia"],
      category: "Geography",
    },
    {
      question: "How many strings does a violin have?",
      correct: "4",
      wrong: ["3", "5", "6"],
      category: "Music",
    },
    {
      question: "What is the chemical symbol for gold?",
      correct: "Au",
      wrong: ["Gd", "Go", "Ag"],
      category: "Chemistry",
    },
    {
      question: "Who painted the Mona Lisa?",
      correct: "Leonardo da Vinci",
      wrong: ["Michelangelo", "Raphael", "Donatello"],
      category: "Art",
    },
    {
      question: "How many minutes are in a day?",
      correct: "1440",
      wrong: ["1200", "1800", "2400"],
      category: "Math",
    },
    {
      question: "What is the capital of Japan?",
      correct: "Tokyo",
      wrong: ["Osaka", "Kyoto", "Nagano"],
      category: "Geography",
    },
    {
      question: "Which planet is known as the Red Planet?",
      correct: "Mars",
      wrong: ["Venus", "Mercury", "Jupiter"],
      category: "Science",
    },
    {
      question: "How many continents are there?",
      correct: "7",
      wrong: ["6", "5", "8"],
      category: "Geography",
    },
    {
      question: "What is the fastest land animal?",
      correct: "Cheetah",
      wrong: ["Lion", "Gazelle", "Greyhound"],
      category: "Nature",
    },
    {
      question: "In what year was the internet invented?",
      correct: "1983",
      wrong: ["1975", "1990", "2000"],
      category: "Technology",
    },
    {
      question: "What is the hardest natural substance?",
      correct: "Diamond",
      wrong: ["Sapphire", "Ruby", "Quartz"],
      category: "Science",
    },
    {
      question: "How many days are in February in a leap year?",
      correct: "29",
      wrong: ["28", "30", "31"],
      category: "Calendar",
    },
    {
      question: "What is the capital of Australia?",
      correct: "Canberra",
      wrong: ["Sydney", "Melbourne", "Brisbane"],
      category: "Geography",
    },
    {
      question: "Which animal is the tallest living land animal?",
      correct: "Giraffe",
      wrong: ["Elephant", "Ostrich", "Moose"],
      category: "Nature",
    },
  ],
  2: [
    {
      question: "What is the capital of Brazil?",
      correct: "Brasília",
      wrong: ["Rio de Janeiro", "São Paulo", "Salvador"],
      category: "Geography",
    },
    {
      question: "How many bones are in the human body?",
      correct: "206",
      wrong: ["186", "226", "246"],
      category: "Biology",
    },
    {
      question: "What is the most spoken language in the world?",
      correct: "Mandarin Chinese",
      wrong: ["English", "Spanish", "Hindi"],
      category: "Languages",
    },
    {
      question: "In what year did World War II end?",
      correct: "1945",
      wrong: ["1943", "1947", "1940"],
      category: "History",
    },
    {
      question: "What is the chemical symbol for silver?",
      correct: "Ag",
      wrong: ["Si", "Se", "S"],
      category: "Chemistry",
    },
    {
      question: "Who composed Beethoven's famous 9th Symphony?",
      correct: "Ludwig van Beethoven",
      wrong: ["Wolfgang Mozart", "Johann Bach", "Franz Liszt"],
      category: "Music",
    },
    {
      question: "What is the deepest ocean trench?",
      correct: "Mariana Trench",
      wrong: ["Tonga Trench", "Philippine Trench", "Kuril-Kamchatka Trench"],
      category: "Geography",
    },
    {
      question: "How many muscles are in the human body?",
      correct: "640",
      wrong: ["520", "760", "420"],
      category: "Biology",
    },
    {
      question: "What is the speed of light?",
      correct: "299,792,458 m/s",
      wrong: ["250,000,000 m/s", "350,000,000 m/s", "200,000,000 m/s"],
      category: "Physics",
    },
    {
      question: "In what year was the Declaration of Independence signed?",
      correct: "1776",
      wrong: ["1774", "1778", "1780"],
      category: "History",
    },
    {
      question: "What is the most abundant element in the universe?",
      correct: "Hydrogen",
      wrong: ["Helium", "Carbon", "Oxygen"],
      category: "Chemistry",
    },
    {
      question: "Which artist cut off part of his own ear?",
      correct: "Vincent van Gogh",
      wrong: ["Pablo Picasso", "Frida Kahlo", "Salvador Dalí"],
      category: "Art",
    },
    {
      question: "What is the longest river in Africa?",
      correct: "Nile River",
      wrong: ["Congo River", "Zambezi River", "Niger River"],
      category: "Geography",
    },
    {
      question: "How many strings does a cello have?",
      correct: "4",
      wrong: ["6", "8", "5"],
      category: "Music",
    },
    {
      question: "What percentage of the Earth's surface is water?",
      correct: "71%",
      wrong: ["65%", "80%", "55%"],
      category: "Geography",
    },
    {
      question: "In what year did the Challenger disaster occur?",
      correct: "1986",
      wrong: ["1984", "1988", "1990"],
      category: "History",
    },
    {
      question: "What is the smallest country in the world?",
      correct: "Vatican City",
      wrong: ["Monaco", "Liechtenstein", "Malta"],
      category: "Geography",
    },
    {
      question: "How many time zones are in Russia?",
      correct: "11",
      wrong: ["9", "12", "10"],
      category: "Geography",
    },
    {
      question: "What is the boiling point of water at sea level?",
      correct: "100°C",
      wrong: ["98°C", "105°C", "95°C"],
      category: "Physics",
    },
    {
      question: "Who discovered penicillin?",
      correct: "Alexander Fleming",
      wrong: ["Louis Pasteur", "Marie Curie", "Joseph Lister"],
      category: "Science",
    },
    {
      question: "What is the capital of Egypt?",
      correct: "Cairo",
      wrong: ["Alexandria", "Giza", "Memphis"],
      category: "Geography",
    },
  ],
  3: [
    {
      question: "What is the capital of Kazakhstan?",
      correct: "Nur-Sultan (formerly Astana)",
      wrong: ["Almaty", "Karaganda", "Atyrau"],
      category: "Geography",
    },
    {
      question: "In what year was the first iPhone released?",
      correct: "2007",
      wrong: ["2005", "2008", "2006"],
      category: "Technology",
    },
    {
      question: "What is the Avogadro constant?",
      correct: "6.022 × 10²³",
      wrong: ["3.14 × 10²³", "9.1 × 10²³", "1.6 × 10²³"],
      category: "Chemistry",
    },
    {
      question: "Who won the first Nobel Prize in Physics?",
      correct: "Wilhelm Röntgen",
      wrong: ["Max Planck", "Albert Einstein", "Niels Bohr"],
      category: "Science",
    },
    {
      question: "What is the surface area of Mars?",
      correct: "144.8 million km²",
      wrong: ["128.5 million km²", "165.3 million km²", "112.1 million km²"],
      category: "Science",
    },
    {
      question: "In which year did the Berlin Wall fall?",
      correct: "1989",
      wrong: ["1987", "1991", "1988"],
      category: "History",
    },
    {
      question: "What is the most densely populated country in the world?",
      correct: "Monaco",
      wrong: ["Singapore", "Malta", "Bahrain"],
      category: "Geography",
    },
    {
      question: "How many valence electrons does a silicon atom have?",
      correct: "4",
      wrong: ["3", "5", "2"],
      category: "Chemistry",
    },
    {
      question: "Who wrote '1984'?",
      correct: "George Orwell",
      wrong: ["Aldous Huxley", "Ray Bradbury", "Kurt Vonnegut"],
      category: "Literature",
    },
    {
      question: "What is the highest peak in Africa?",
      correct: "Mount Kilimanjaro",
      wrong: ["Mount Kenya", "Mount Stanley", "Mount Speke"],
      category: "Geography",
    },
    {
      question: "In what year was the first transatlantic telegraph cable laid?",
      correct: "1858",
      wrong: ["1855", "1860", "1862"],
      category: "History",
    },
    {
      question: "What is the pH of pure water at 25°C?",
      correct: "7",
      wrong: ["6.5", "7.5", "8"],
      category: "Chemistry",
    },
    {
      question: "How many sides does a dodecagon have?",
      correct: "12",
      wrong: ["10", "14", "8"],
      category: "Math",
    },
    {
      question: "What is the escape velocity from Earth?",
      correct: "11.2 km/s",
      wrong: ["9.8 km/s", "13.1 km/s", "7.5 km/s"],
      category: "Physics",
    },
    {
      question: "In what year did the Magna Carta get signed?",
      correct: "1215",
      wrong: ["1206", "1225", "1200"],
      category: "History",
    },
    {
      question: "What is the capital of Montenegro?",
      correct: "Podgorica",
      wrong: ["Cetinje", "Nikšić", "Budva"],
      category: "Geography",
    },
    {
      question: "How many degrees are in a radian?",
      correct: "57.3",
      wrong: ["45.2", "63.7", "51.5"],
      category: "Math",
    },
    {
      question: "Who discovered the electron?",
      correct: "J.J. Thomson",
      wrong: ["Niels Bohr", "Ernest Rutherford", "Max Planck"],
      category: "Science",
    },
    {
      question: "What is the atomic number of Gold?",
      correct: "79",
      wrong: ["74", "82", "77"],
      category: "Chemistry",
    },
    {
      question: "In what year was the internet made publicly available?",
      correct: "1991",
      wrong: ["1989", "1993", "1995"],
      category: "Technology",
    },
    {
      question: "What is the second largest planet by mass in the solar system?",
      correct: "Saturn",
      wrong: ["Neptune", "Uranus", "Earth"],
      category: "Science",
    },
  ],
  4: [
    {
      question: "What is the Chandrasekhar limit?",
      correct: "1.4 solar masses",
      wrong: ["0.8 solar masses", "2.1 solar masses", "1.9 solar masses"],
      category: "Physics",
    },
    {
      question: "In what year was the Rosetta Stone discovered?",
      correct: "1799",
      wrong: ["1795", "1801", "1803"],
      category: "History",
    },
    {
      question: "What is the only mammal that cannot jump?",
      correct: "Elephant",
      wrong: ["Hippopotamus", "Rhinoceros", "Whale"],
      category: "Biology",
    },
    {
      question: "What is the Planck constant?",
      correct: "6.626 × 10⁻³⁴ J·s",
      wrong: ["3.14 × 10⁻³⁴ J·s", "9.1 × 10⁻³¹ J·s", "1.6 × 10⁻¹⁹ J·s"],
      category: "Physics",
    },
    {
      question: "Who was the first person to win Nobel Prizes in two different fields?",
      correct: "Marie Curie",
      wrong: ["Linus Pauling", "John Bardeen", "Frederick Sanger"],
      category: "Science",
    },
    {
      question: "In what year did the Byzantine Empire fall?",
      correct: "1453",
      wrong: ["1450", "1456", "1448"],
      category: "History",
    },
    {
      question: "What is the capital of Kyrgyzstan?",
      correct: "Bishkek",
      wrong: ["Osh", "Karakol", "Jalal-Abad"],
      category: "Geography",
    },
    {
      question: "What is the Pauli exclusion principle?",
      correct: "No two fermions can occupy the same quantum state",
      wrong: ["All particles must have spin", "Energy is quantized", "Particles have wave properties"],
      category: "Physics",
    },
    {
      question: "How many protons does an Uranium-235 nucleus have?",
      correct: "92",
      wrong: ["90", "94", "88"],
      category: "Chemistry",
    },
    {
      question: "In what year was the first successful airplane flight?",
      correct: "1903",
      wrong: ["1900", "1905", "1901"],
      category: "History",
    },
    {
      question: "What is the molar volume of an ideal gas at STP?",
      correct: "22.4 L/mol",
      wrong: ["20.1 L/mol", "24.5 L/mol", "18.9 L/mol"],
      category: "Chemistry",
    },
    {
      question: "Who developed the theory of evolution?",
      correct: "Charles Darwin",
      wrong: ["Jean-Baptiste Lamarck", "Herbert Spencer", "Thomas Huxley"],
      category: "Science",
    },
    {
      question: "What is the gravitational constant?",
      correct: "6.674 × 10⁻¹¹ m³·kg⁻¹·s⁻²",
      wrong: ["3.14 × 10⁻¹¹ m³·kg⁻¹·s⁻²", "9.8 × 10⁻¹¹ m³·kg⁻¹·s⁻²", "1.6 × 10⁻¹⁹ m³·kg⁻¹·s⁻²"],
      category: "Physics",
    },
    {
      question: "In what year was the printing press invented?",
      correct: "1440",
      wrong: ["1435", "1445", "1450"],
      category: "History",
    },
    {
      question: "What is the capital of Uzbekistan?",
      correct: "Tashkent",
      wrong: ["Samarkand", "Bukhara", "Fergana"],
      category: "Geography",
    },
    {
      question: "What is the Heisenberg uncertainty principle?",
      correct: "Cannot simultaneously know position and momentum precisely",
      wrong: ["All particles are uncertain", "Energy is relative", "Time is relative"],
      category: "Physics",
    },
    {
      question: "Who wrote 'Critique of Pure Reason'?",
      correct: "Immanuel Kant",
      wrong: ["Friedrich Hegel", "Arthur Schopenhauer", "Georg Hegel"],
      category: "Philosophy",
    },
    {
      question: "What is the speed of sound in air at 20°C?",
      correct: "343 m/s",
      wrong: ["300 m/s", "380 m/s", "320 m/s"],
      category: "Physics",
    },
    {
      question: "In what year did the first heart transplant occur?",
      correct: "1967",
      wrong: ["1965", "1969", "1970"],
      category: "History",
    },
    {
      question: "What is the pH of a solution with [H+] = 10⁻⁵ M?",
      correct: "5",
      wrong: ["4", "6", "3"],
      category: "Chemistry",
    },
    {
      question: "Who formulated the three laws of motion?",
      correct: "Isaac Newton",
      wrong: ["Galileo Galilei", "Johannes Kepler", "René Descartes"],
      category: "Physics",
    },
  ],
  5: [
    {
      question: "What is the Schwarzschild radius of Earth?",
      correct: "~9 mm",
      wrong: ["~5 mm", "~15 mm", "~20 mm"],
      category: "Physics",
    },
    {
      question: "In what year was the Standard Model of particle physics completed?",
      correct: "1973",
      wrong: ["1970", "1975", "1968"],
      category: "Physics",
    },
    {
      question: "What is the fine-structure constant approximately equal to?",
      correct: "1/137",
      wrong: ["1/139", "1/135", "1/140"],
      category: "Physics",
    },
    {
      question: "Who developed the Calabi-Yau manifold?",
      correct: "Eugenio Calabi and Shing-Tung Yau",
      wrong: ["Michael Atiyah and Raoul Bott", "Mikhail Gromov", "Simon Donaldson"],
      category: "Mathematics",
    },
    {
      question: "What is the exact value of Avogadro's constant as of 2019 redefinition?",
      correct: "6.02214076 × 10²³",
      wrong: ["6.022 × 10²³", "6.0221 × 10²³", "6.022140857 × 10²³"],
      category: "Chemistry",
    },
    {
      question: "In what year was the Higgs boson experimentally confirmed?",
      correct: "2012",
      wrong: ["2010", "2013", "2011"],
      category: "Physics",
    },
    {
      question: "What is the Rydberg constant?",
      correct: "1.097 × 10⁷ m⁻¹",
      wrong: ["1.5 × 10⁷ m⁻¹", "0.8 × 10⁷ m⁻¹", "2.1 × 10⁷ m⁻¹"],
      category: "Physics",
    },
    {
      question: "Who proved Fermat's Last Theorem?",
      correct: "Andrew Wiles",
      wrong: ["David Hilbert", "Kurt Gödel", "Emmy Noether"],
      category: "Mathematics",
    },
    {
      question: "What is the Boltzmann constant?",
      correct: "1.380649 × 10⁻²³ J/K",
      wrong: ["1.6 × 10⁻¹⁹ J/K", "6.626 × 10⁻³⁴ J/K", "2.998 × 10⁸ J/K"],
      category: "Physics",
    },
    {
      question: "In what year did the Meiji Restoration occur in Japan?",
      correct: "1868",
      wrong: ["1865", "1870", "1872"],
      category: "History",
    },
    {
      question: "What is the Debye temperature?",
      correct: "Characteristic temperature related to lattice vibrations",
      wrong: ["Melting point", "Boiling point", "Critical temperature"],
      category: "Physics",
    },
    {
      question: "Who developed the Lorentz transformation?",
      correct: "Hendrik Lorentz",
      wrong: ["Albert Einstein", "Hermann Minkowski", "Henri Poincaré"],
      category: "Physics",
    },
    {
      question: "What is the electron g-factor?",
      correct: "2.00231930436256",
      wrong: ["1.5", "2.5", "1.0"],
      category: "Physics",
    },
    {
      question: "In what year was quantum mechanics founded?",
      correct: "1925",
      wrong: ["1920", "1930", "1935"],
      category: "Physics",
    },
    {
      question: "What is the Kohlrausch law?",
      correct: "Molar conductivity is sum of contributions from individual ions",
      wrong: ["Conductivity is inversely proportional to temperature", "All metals have equal conductivity", "Conductivity is constant"],
      category: "Chemistry",
    },
    {
      question: "Who discovered the muon?",
      correct: "Carl D. Anderson",
      wrong: ["Ernest Rutherford", "J.J. Thomson", "Enrico Fermi"],
      category: "Physics",
    },
    {
      question: "What is the Wigner semi-circle law?",
      correct: "Distribution of eigenvalues of random matrices",
      wrong: ["Law of molecular motion", "Distribution of particle velocities", "Statistical distribution of elements"],
      category: "Mathematics",
    },
    {
      question: "In what year was the CPT theorem proven?",
      correct: "1955",
      wrong: ["1950", "1960", "1965"],
      category: "Physics",
    },
    {
      question: "What is the exact speed of light?",
      correct: "299,792,458 m/s",
      wrong: ["300,000,000 m/s", "299,792,459 m/s", "299,792,457 m/s"],
      category: "Physics",
    },
    {
      question: "Who developed the Ginzburg-Landau theory?",
      correct: "Vitaly Ginzburg and Lev Landau",
      wrong: ["Vladimir Fock and Paul Dirac", "Max Born and Werner Heisenberg", "Niels Bohr and Arnold Sommerfeld"],
      category: "Physics",
    },
    {
      question: "What is the Lamb shift in hydrogen?",
      correct: "Energy difference between 2S and 2P states",
      wrong: ["Energy difference between 1S and 2S states", "Fine structure splitting", "Hyperfine structure"],
      category: "Physics",
    },
  ],
};

/**
 * Shuffle array in place using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generate answers array with randomized positions
 */
function generateAnswers(correctAnswer, wrongAnswers) {
  const answers = [
    { text: correctAnswer, isCorrect: true },
    { text: wrongAnswers[0], isCorrect: false },
    { text: wrongAnswers[1], isCorrect: false },
    { text: wrongAnswers[2], isCorrect: false },
  ];
  return shuffleArray(answers);
}

/**
 * Seed the database with questions and answers
 */
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Get existing difficulty levels to verify they exist
    const { data: difficultyLevels, error: diffError } = await supabase
      .from("difficulty_levels")
      .select("id, level");

    if (diffError) throw diffError;

    if (!difficultyLevels || difficultyLevels.length === 0) {
      throw new Error("No difficulty levels found. Please run migrations first.");
    }

    console.log(`✓ Found ${difficultyLevels.length} difficulty levels\n`);

    // Map difficulty level IDs
    const difficultyMap = {};
    difficultyLevels.forEach((level) => {
      difficultyMap[level.level] = level.id;
    });

    let totalQuestionsAdded = 0;
    let totalAnswersAdded = 0;

    // Seed questions for each difficulty level
    for (const [levelNumber, questions] of Object.entries(trivia)) {
      const level = parseInt(levelNumber);
      const difficultyId = difficultyMap[level];

      console.log(
        `📝 Seeding ${questions.length} questions for Level ${level}...`
      );

      for (const q of questions) {
        // Insert question
        const { data: questionData, error: qError } = await supabase
          .from("questions")
          .insert({
            difficulty_level_id: difficultyId,
            question_text: q.question,
            category: q.category,
          })
          .select();

        if (qError) {
          console.error(`  ✗ Error inserting question: ${q.question}`);
          console.error(`    ${qError.message}`);
          continue;
        }

        const questionId = questionData[0].id;
        totalQuestionsAdded++;

        // Generate and insert answers
        const answers = generateAnswers(q.correct, q.wrong);
        const { error: aError } = await supabase.from("answers").insert(
          answers.map((answer) => ({
            question_id: questionId,
            answer_text: answer.text,
            is_correct: answer.isCorrect,
          }))
        );

        if (aError) {
          console.error(
            `  ✗ Error inserting answers for question: ${q.question}`
          );
          console.error(`    ${aError.message}`);
        } else {
          totalAnswersAdded += answers.length;
        }
      }

      console.log(
        `  ✓ Level ${level} complete - ${questions.length} questions added\n`
      );
    }

    console.log("\n✅ Seeding complete!");
    console.log(`   Total Questions: ${totalQuestionsAdded}`);
    console.log(`   Total Answers: ${totalAnswersAdded}`);
    console.log(`   Average answers per question: ${(totalAnswersAdded / totalQuestionsAdded).toFixed(1)}`);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

// Run the seed script
seedDatabase().then(() => process.exit(0));

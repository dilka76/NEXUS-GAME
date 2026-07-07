# Database Seeding Script

## Overview
The `seed.js` script populates your Supabase database with sample trivia data for the Millionaire Game.

## What Gets Seeded

✅ **5 Difficulty Levels** (automatically created by migrations)
- Level 1: Easy
- Level 2: Medium
- Level 3: Hard
- Level 4: Very Hard
- Level 5: Extreme

✅ **105 Trivia Questions Total**
- 21 questions per difficulty level
- Questions increase in complexity and specificity with each level
- Categories: Geography, History, Science, Mathematics, Physics, Chemistry, Biology, etc.

✅ **420 Answer Options**
- 4 answers per question
- 1 correct answer
- 3 incorrect answers
- Randomized order for each question

## Prerequisites

1. **Environment Variables** - Set these in your `.env.local` file:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Database Migrations** - Run migrations first:
   ```bash
   npm run db:migrate
   # or use Supabase CLI
   supabase migration up
   ```

3. **Dependencies** - Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

## How to Run

### Option 1: Direct Node Execution
```bash
node scripts/seed.js
```

### Option 2: Add npm script to package.json
Add this to your `package.json`:
```json
{
  "scripts": {
    "db:seed": "node scripts/seed.js"
  }
}
```

Then run:
```bash
npm run db:seed
```

## Output Example

```
🌱 Starting database seeding...

✓ Found 5 difficulty levels

📝 Seeding 21 questions for Level 1...
  ✓ Level 1 complete - 21 questions added

📝 Seeding 21 questions for Level 2...
  ✓ Level 2 complete - 21 questions added

[... continues for levels 3, 4, 5 ...]

✅ Seeding complete!
   Total Questions: 105
   Total Answers: 420
   Average answers per question: 4.0
```

## Question Distribution

### Level 1 (Easy) - 21 Questions
Basic knowledge questions on:
- General geography capitals
- Simple math
- Basic science facts
- Famous works of art and literature

### Level 2 (Medium) - 21 Questions
Moderate difficulty including:
- Less common capitals
- Biological facts
- Historical dates
- Chemical symbols

### Level 3 (Hard) - 21 Questions
More challenging with:
- Specific scientific measurements
- Technical physics concepts
- Obscure historical events
- Complex mathematical values

### Level 4 (Very Hard) - 21 Questions
Advanced topics:
- Fundamental constants (Planck, Boltzmann, Avogadro)
- Complex historical events
- Particle physics concepts
- Advanced mathematical principles

### Level 5 (Extreme) - 21 Questions
Expert-level questions:
- Quantum mechanics principles
- Precise physical constants
- Advanced mathematics and theoretical physics
- Obscure scientific discoveries

## Features

✨ **Fisher-Yates Shuffle** - Randomizes answer position for fairness
✨ **Error Handling** - Graceful error messages if something fails
✨ **Progress Tracking** - Real-time console output during seeding
✨ **Atomic Operations** - Each question/answer set inserted together
✨ **Category Support** - All questions tagged with relevant categories

## Troubleshooting

### Connection Issues
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check your Supabase project is active
- Ensure internet connection is available

### Migration Not Found
- Run migrations before seeding: `supabase migration up`
- Verify the initial schema migration was successful

### Partial Data Inserted
- The script continues on individual answer errors
- Check console output for specific failed questions
- Can safely re-run (will insert duplicates for successful ones)

### Clear and Reseed
To delete all questions and start fresh:
```sql
DELETE FROM answers CASCADE;
DELETE FROM questions CASCADE;
```

Then re-run the seed script.

## Adding More Questions

Edit `scripts/seed.js` and add questions to the `trivia` object:

```javascript
const trivia = {
  1: [
    {
      question: "Your question here?",
      correct: "Correct answer",
      wrong: ["Wrong 1", "Wrong 2", "Wrong 3"],
      category: "Category Name",
    },
    // ... more questions
  ],
  // ... other levels
};
```

## Notes

- The seeding script uses the Supabase JavaScript client
- All timestamps default to current UTC time
- Questions are inserted with proper foreign key relationships
- RLS policies are respected during seeding (uses anon key)
- Safe to run multiple times (will create duplicate entries)

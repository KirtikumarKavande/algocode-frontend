import Dexie, { type Table } from 'dexie';

// Define the structure of a solution
interface Solution {
  problemId: string; // Primary key
  solutions: { [language: string]: string }; // Language-specific code
}

// Create a Dexie database instance
const db = new Dexie('SolutionDatabase') as Dexie & {
  userSolution: Table<Solution, 'problemId'>; // Table type for user solutions
};

// Define the database schema
db.version(1).stores({
  userSolution: 'problemId', // Define "problemId" as the primary key
});

// Export types and database instance
export type { Solution };
export { db };

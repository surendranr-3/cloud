/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    FINANCEFLOW - BACKEND SERVER                           ║
 * ║                      Express.js REST API Server                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * OVERVIEW:
 * This backend server provides a REST API for managing financial transactions.
 * It handles CRUD operations (Create, Read, Delete) on expense/income data
 * with persistent JSON file storage.
 * 
 * FEATURES:
 * - Complete transaction management API
 * - File-based persistence (no database required)
 * - CORS enabled for cross-origin requests
 * - Input validation for all transactions
 * - Error handling with appropriate HTTP status codes
 * - Sample data initialization on first run
 * 
 * DEPENDENCIES:
 * - express: Web framework for handling HTTP requests
 * - fs: Node.js file system module for reading/writing data
 * - path: Node.js path utilities for file path handling
 * - cors: Middleware for Cross-Origin Resource Sharing
 */

// ═══════════════════════════════════════════════════════════════════════════
// DEPENDENCIES
// ═══════════════════════════════════════════════════════════════════════════
const express = require("express");          // Web framework
const fs = require("fs");                      // File system operations
const path = require("path");                  // Path utilities
const cors = require("cors");                  // CORS middleware

// ═══════════════════════════════════════════════════════════════════════════
// SERVER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
const app = express();                         // Initialize Express application
const PORT = process.env.PORT || 3000;         // Port: env variable or default 3000
const DATA_FILE = path.join(__dirname, "transactions.json"); // Data storage path

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE SETUP
// ═══════════════════════════════════════════════════════════════════════════
// These middleware functions are executed for EVERY incoming request

// Enable CORS: Allows requests from frontend on different domain/port
app.use(cors());

// Parse JSON request bodies: Makes req.body available as JavaScript objects
app.use(express.json());

// Serve static files: Delivers HTML/CSS/JS from public directory to browser
app.use(express.static(path.join(__dirname, "public")));

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS - File I/O Operations
// ═══════════════════════════════════════════════════════════════════════════

/**
 * READ TRANSACTIONS FROM FILE
 * 
 * Retrieves all transactions from the JSON data file.
 * If file doesn't exist, creates it with sample data.
 * Gracefully handles errors by returning empty array.
 * 
 * @returns {Array} Array of transaction objects
 *   Structure: [{id: number, text: string, amount: number}, ...]
 * 
 * PROCESS:
 * 1. Check if transactions.json file exists
 * 2. If not: Create file with sample data and return sample
 * 3. If yes: Read file, parse JSON, and return array
 * 4. On error: Log error and return empty array
 */
function readTransactions() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // File doesn't exist: Create with sample data for demonstration
      const sample = [
        { id: 1710001001, text: "Salary 💼", amount: 4850.0 },
        { id: 1710001002, text: "Freelance project", amount: 1200.0 },
        { id: 1710001003, text: "Groceries 🛒", amount: -245.5 },
        { id: 1710001004, text: "Internet & Netflix", amount: -89.99 },
        { id: 1710001005, text: "Dining out", amount: -67.3 },
        { id: 1710001006, text: "Gift 🎁", amount: 150.0 },
      ];
      // Write sample data to file with pretty formatting (2-space indentation)
      fs.writeFileSync(DATA_FILE, JSON.stringify(sample, null, 2));
      return sample;
    }
    // File exists: Read and parse it
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("Read Error:", err);
    return []; // Return empty array on error (graceful degradation)
  }
}

/**
 * WRITE TRANSACTIONS TO FILE
 * 
 * Persists transaction array to JSON file.
 * Uses synchronous I/O to ensure data is saved before returning response.
 * 
 * @param {Array} transactions - Array of transaction objects to save
 */
function writeTransactions(transactions) {
  try {
    // Write array to file with pretty formatting (null=all properties, 2=spaces)
    fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
  } catch (err) {
    console.error("Write Error:", err);
    // Error logged but not thrown - allows operation to continue
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// API ENDPOINTS - REST API Routes
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/transactions
 * 
 * ENDPOINT: Retrieve all transactions
 * METHOD: GET
 * PARAMETERS: None
 * BODY: None
 * 
 * RESPONSE: 200 OK
 * Returns JSON array of all transaction objects
 * 
 * EXAMPLE REQUEST:
 * GET http://localhost:3000/api/transactions
 * 
 * EXAMPLE RESPONSE:
 * [
 *   { "id": 1710001001, "text": "Salary", "amount": 4850.0 },
 *   { "id": 1710001002, "text": "Groceries", "amount": -245.5 }
 * ]
 */
// GET all transactions
app.get("/api/transactions", (req, res) => {
  res.json(readTransactions());
});

/**
 * POST /api/transactions
 * 
 * ENDPOINT: Create a new transaction
 * METHOD: POST
 * CONTENT-TYPE: application/json
 * 
 * REQUEST BODY:
 * {
 *   "text": string (required, non-empty)
 *   "amount": number (required, non-zero)
 * }
 * 
 * VALIDATION:
 * - text: Must not be empty (trimmed)
 * - amount: Must be a valid number and not equal to 0
 * 
 * RESPONSE: 201 Created
 * Returns the newly created transaction with auto-generated ID
 * 
 * ERROR RESPONSES:
 * - 400: "Description required" (empty text)
 * - 400: "Valid amount required" (invalid amount)
 * 
 * ID GENERATION:
 * id = Date.now() + Math.floor(Math.random() * 10000)
 * - Date.now(): Current milliseconds (unique per ms)
 * - Random 0-9999: Prevents collisions at same millisecond
 * - Result: Chronologically sortable, collision-resistant IDs
 * 
 * EXAMPLE REQUEST:
 * POST http://localhost:3000/api/transactions
 * Content-Type: application/json
 * 
 * {
 *   "text": "Grocery shopping",
 *   "amount": 50.25
 * }
 * 
 * EXAMPLE RESPONSE:
 * {
 *   "id": 1710123456789,
 *   "text": "Grocery shopping",
 *   "amount": 50.25
 * }
 */
// ADD transaction
app.post("/api/transactions", (req, res) => {
  const { text, amount } = req.body;

  // Validation: Check if description is provided
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Description required" });
  }

  // Validation: Check if amount is valid and non-zero
  const num = parseFloat(amount);
  if (isNaN(num) || num === 0) {
    return res.status(400).json({ error: "Valid amount required" });
  }

  // Read existing transactions
  const transactions = readTransactions();

  // Create new transaction object
  const newTransaction = {
    id: Date.now() + Math.floor(Math.random() * 10000), // Unique ID
    text: text.trim(), // Clean whitespace
    amount: num, // Validated number
  };

  // Add to array and persist to file
  transactions.push(newTransaction);
  writeTransactions(transactions);

  // Return created transaction with 201 status
  res.status(201).json(newTransaction);
});

/**
 * DELETE /api/transactions/:id
 * 
 * ENDPOINT: Delete a specific transaction by ID
 * METHOD: DELETE
 * PARAMETER: id (path parameter - transaction ID)
 * BODY: None
 * 
 * RESPONSE: 200 OK
 * { "success": true }
 * 
 * ERROR RESPONSE: 404 Not Found
 * { "error": "Transaction not found" }
 * - Returned if ID doesn't match any transaction
 * 
 * DELETION LOGIC:
 * 1. Read all transactions
 * 2. Filter array to remove matching ID
 * 3. Check if deletion occurred (compare array lengths)
 * 4. If match found: save updated array and return success
 * 5. If no match: return 404 error
 * 
 * EXAMPLE REQUEST:
 * DELETE http://localhost:3000/api/transactions/1710001001
 * 
 * EXAMPLE RESPONSE:
 * { "success": true }
 */
// DELETE transaction
app.delete("/api/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let transactions = readTransactions();
  // Create new array without matching ID (doesn't modify original)
  const filtered = transactions.filter((t) => t.id !== id);

  // Check if transaction was found
  if (filtered.length === transactions.length) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  // Persist updated array without deleted transaction
  writeTransactions(filtered);
  res.json({ success: true });
});

/**
 * DELETE /api/transactions (SPECIAL: RESET ALL)
 * 
 * ENDPOINT: Clear all transactions (reset database)
 * METHOD: DELETE
 * PARAMETER: None
 * BODY: None
 * 
 * RESPONSE: 200 OK
 * {
 *   "success": true,
 *   "message": "All transactions cleared"
 * }
 * 
 * ⚠️ WARNING:
 * This operation is irreversible!
 * All transaction history is permanently deleted.
 * Frontend should show confirmation dialog before calling.
 * 
 * EXAMPLE REQUEST:
 * DELETE http://localhost:3000/api/transactions
 */
// RESET all data
app.delete("/api/transactions", (req, res) => {
  // Write empty array to clear all data
  writeTransactions([]);
  res.json({ success: true, message: "All transactions cleared" });
});

// ═══════════════════════════════════════════════════════════════════════════
// STATIC FILE SERVING & ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Serve Frontend HTML
 * 
 * Static files (CSS, images, etc.) are served by express.static middleware.
 * This route serves index.html for the root path.
 */
// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * 404 Error Handler
 * 
 * Called when no other route matches
 * Returns JSON error message with 404 status
 */
// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/**
 * 500 Error Handler
 * 
 * Global error handler for server errors
 * Logs error to console for debugging
 * Returns 500 status with generic error message
 */
// Handle 500 - Server errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ═══════════════════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Start Express Server
 * 
 * Listens on configured PORT (default 3000)
 * Logs startup information to console
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Data stored in ${DATA_FILE}`);
});
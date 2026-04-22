const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "transactions.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// ================= Helper Functions =================

function readTransactions() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const sample = [
        { id: 1710001001, text: "Salary 💼", amount: 4850.0 },
        { id: 1710001002, text: "Freelance project", amount: 1200.0 },
        { id: 1710001003, text: "Groceries 🛒", amount: -245.5 },
        { id: 1710001004, text: "Internet & Netflix", amount: -89.99 },
        { id: 1710001005, text: "Dining out", amount: -67.3 },
        { id: 1710001006, text: "Gift 🎁", amount: 150.0 },
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(sample, null, 2));
      return sample;
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    console.error("Read Error:", err);
    return [];
  }
}

function writeTransactions(transactions) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
  } catch (err) {
    console.error("Write Error:", err);
  }
}

// ================= API ROUTES =================

// GET all transactions
app.get("/api/transactions", (req, res) => {
  res.json(readTransactions());
});

// ADD transaction
app.post("/api/transactions", (req, res) => {
  const { text, amount } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Description required" });
  }

  const num = parseFloat(amount);
  if (isNaN(num) || num === 0) {
    return res.status(400).json({ error: "Valid amount required" });
  }

  const transactions = readTransactions();

  const newTransaction = {
    id: Date.now() + Math.floor(Math.random() * 10000),
    text: text.trim(),
    amount: num,
  };

  transactions.push(newTransaction);
  writeTransactions(transactions);

  res.status(201).json(newTransaction);
});

// DELETE transaction
app.delete("/api/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);

  let transactions = readTransactions();
  const filtered = transactions.filter((t) => t.id !== id);

  if (filtered.length === transactions.length) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  writeTransactions(filtered);
  res.json({ success: true });
});

// RESET all data (NEW FEATURE)
app.delete("/api/transactions", (req, res) => {
  writeTransactions([]);
  res.json({ success: true, message: "All transactions cleared" });
});

// ================= ROUTES =================

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= ERROR HANDLING =================

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Data stored in ${DATA_FILE}`);
});
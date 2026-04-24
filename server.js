require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data
let expenses = [];

// Home route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Add new expense
app.post("/expenses", (req, res) => {
  const { amount, category, description, date } = req.body;

  // Validation
  if (amount == null || !category || !date) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // 🔹 Normalize inputs
  const normalizedAmount = Number(amount);
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedDescription = (description || "").trim().toLowerCase();
  const normalizedDate = date; // assuming correct format already

  // 🔍 Duplicate check
  const exists = expenses.find((e) =>
    e.amount === normalizedAmount &&
    e.category === normalizedCategory &&
    e.date === normalizedDate &&
    e.description === normalizedDescription
  );

  if (exists) {
    return res.status(409).json({ error: "Duplicate expense" });
  }

  // Create new expense
  const newExpense = {
    id: Date.now(),
    amount: normalizedAmount,
    category: normalizedCategory,
    description: normalizedDescription,
    date: normalizedDate,
    created_at: new Date().toISOString(),
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

// Get expenses (with filter + sort)
app.get("/expenses", (req, res) => {
  let result = [...expenses];
  const { category, sort } = req.query;

  // 🔹 Normalize query input
  const normalizedCategory = category?.trim().toLowerCase();

  // Filter
  if (normalizedCategory) {
    result = result.filter((e) => e.category === normalizedCategory);
  }

  // Sort
  if (sort === "date_desc") {
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "date_asc") {
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
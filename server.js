require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT ||3000;
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
//In-memory data
let expenses = [];
// Sample route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});
//Add new expenses
app.post("/expenses", (req, res) => {
  const { amount, category, description, date } = req.body;
  // Basic validation
  if (!amount || !category || !date) {
    return res.status(400).json({ error: "Missing fields" });
  }
  // Check if already exists
  const exists = expenses.find((e) =>
    e.amount === amount &&
    e.category === category &&
    e.date === date &&
    e.description === description
  );

  if (exists) {
    return res.json(exists);c
  }
  const newExpense = {
    id: Date.now(),
    amount: Number(amount),
    category,
    description: description || "",
    date,
    created_at: new
  Date().toISOString(),  
  };
  expenses.push(newExpense);

  res.status(201).json(newExpense);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

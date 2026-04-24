require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT ||3000;
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Sample route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
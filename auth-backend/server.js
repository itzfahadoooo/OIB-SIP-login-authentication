const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cors = require("cors");

const app = express();


const PORT = 3000;
const usersFile = "users.json";

// ✅ Allow frontend to access backend
app.use(
  cors({
    origin: ["https://oib-sip-login-authentication-7gk6.vercel.app/", "https://oib-sip-login-authentication.onrender.com"],
    credentials: true, // Allow cookies & authentication headers
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust for your frontend
    credentials: true,
  })
);

// Helper function to read users
const readUsers = () => {
  if (!fs.existsSync(usersFile)) return {};
  return JSON.parse(fs.readFileSync(usersFile));
};

// Helper function to write users
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = hashedPassword;
  writeUsers(users);

  res.json({ message: "Registration successful" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (!users[username]) {
    return res.status(400).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, users[username]);
  if (!valid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  req.session.user = username;
  res.json({ message: "Login successful", user: username });
});

// Protected route
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ message: `Welcome, ${req.session.user}!!!` });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

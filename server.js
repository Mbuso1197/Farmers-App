const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public")); // Serve HTML files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load products from file
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.json(JSON.parse(data));
  });
});

// Save new product
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  const filePath = path.join(__dirname, "products.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");

    const products = JSON.parse(data);
    products.push(newProduct);

    fs.writeFile(filePath, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).send("Error writing file");
      res.send({ message: "Product saved successfully!" });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🌍 Farmers App running at http://localhost:${PORT}`);
});

// GET all chat messages
app.get("/api/messages", (req, res) => {
  const filePath = path.join(__dirname, "messages.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading messages");
    res.json(JSON.parse(data));
  });
});

// POST new message
app.post("/api/messages", (req, res) => {
  const newMessage = req.body;
  const filePath = path.join(__dirname, "messages.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading messages");

    const messages = JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), err => {
      if (err) return res.status(500).send("Error writing message");
      res.send({ message: "Message saved!" });
    });
  });
});

// Register
app.post("/api/register", (req, res) => {
  const newUser = req.body;
  const filePath = path.join(__dirname, "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");

    const users = JSON.parse(data);
    const exists = users.find(u => u.email === newUser.email);
    if (exists) return res.status(400).json({ message: "Email already used" });

    users.push(newUser);
    fs.writeFile(filePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send("Write error");
      res.send({ message: "User registered" });
    });
  });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const filePath = path.join(__dirname, "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Read error");

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    res.send({ name: user.name, role: user.role, email: user.email });
  });
});
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  // Demo user (password is "123456")
  { email: "admin@transport.gov", password: await bcrypt.hash("123456", 10) },
];

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, "secretKey123", { expiresIn: "1h" });

  res.json({ token });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

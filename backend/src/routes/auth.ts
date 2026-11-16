import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { JWT_SECRET } from "../middleware/auth";

const r = Router();

r.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });
  const user = await prisma.adminUser.findUnique({ where: { username: String(username) } });
  if (!user || !(await bcrypt.compare(String(password), user.passwordHash)))
    return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token, user: { id: user.id, username: user.username } });
});

export default r;

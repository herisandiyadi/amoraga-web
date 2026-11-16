import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

const r = Router();
r.use(requireAuth);

r.get("/", async (_req, res) => {
  res.json(await prisma.chatbotFaq.findMany({ orderBy: { priority: "desc" } }));
});
r.post("/", async (req, res) => {
  const { question, answer, priority } = req.body || {};
  if (!question || !answer) return res.status(400).json({ error: "question and answer required" });
  res.status(201).json(await prisma.chatbotFaq.create({ data: { question, answer, priority: priority ?? 0 } }));
});
r.put("/:id", async (req, res) => {
  const { question, answer, priority } = req.body || {};
  try {
    res.json(await prisma.chatbotFaq.update({ where: { id: Number(req.params.id) }, data: { question, answer, priority } }));
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});
r.delete("/:id", async (req, res) => {
  try {
    await prisma.chatbotFaq.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default r;

import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

export const publicContent = Router();
export const adminContent = Router();
adminContent.use(requireAuth);

publicContent.get("/:key", async (req, res) => {
  const c = await prisma.content.findUnique({ where: { key: req.params.key } });
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});

adminContent.put("/:key", async (req, res) => {
  const value = req.body?.value;
  if (value === undefined) return res.status(400).json({ error: "value required" });
  const c = await prisma.content.upsert({
    where: { key: req.params.key },
    update: { value },
    create: { key: req.params.key, value },
  });
  res.json(c);
});

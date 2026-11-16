import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

export const publicTestimonials = Router();
export const adminTestimonials = Router();
adminTestimonials.use(requireAuth);

publicTestimonials.get("/", async (_req, res) => {
  res.json(await prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: { createdAt: "desc" } }));
});

adminTestimonials.get("/", async (_req, res) => {
  res.json(await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }));
});
adminTestimonials.post("/", async (req, res) => {
  const { name, content, isVisible } = req.body || {};
  if (!name || !content) return res.status(400).json({ error: "name and content required" });
  res.status(201).json(await prisma.testimonial.create({ data: { name, content, isVisible: isVisible ?? true } }));
});
adminTestimonials.put("/:id", async (req, res) => {
  const { name, content, isVisible } = req.body || {};
  try {
    res.json(await prisma.testimonial.update({ where: { id: Number(req.params.id) }, data: { name, content, isVisible } }));
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});
adminTestimonials.delete("/:id", async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

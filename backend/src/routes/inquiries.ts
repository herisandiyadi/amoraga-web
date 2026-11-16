import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

export const publicInquiries = Router();
export const adminInquiries = Router();
adminInquiries.use(requireAuth);

publicInquiries.post("/", async (req, res) => {
  const { name, contact, message } = req.body || {};
  if (!name || !contact || !message) return res.status(400).json({ error: "name, contact, message required" });
  const i = await prisma.inquiry.create({
    data: { source: "contact_form", name: String(name).slice(0, 200), contact: String(contact).slice(0, 200), message: String(message).slice(0, 5000) },
  });
  res.status(201).json({ ok: true, id: i.id });
});

adminInquiries.get("/", async (req, res) => {
  const where: any = {};
  if (req.query.source) where.source = String(req.query.source);
  if (req.query.isRead !== undefined) where.isRead = req.query.isRead === "true";
  res.json(await prisma.inquiry.findMany({ where, orderBy: { createdAt: "desc" } }));
});

adminInquiries.put("/:id", async (req, res) => {
  const { isRead, isReplied } = req.body || {};
  try {
    res.json(await prisma.inquiry.update({ where: { id: Number(req.params.id) }, data: { isRead, isReplied } }));
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

import { Router } from "express";
import { prisma } from "../db";
import { requireAuth } from "../middleware/auth";

export const publicProducts = Router();
export const adminProducts = Router();
adminProducts.use(requireAuth);

publicProducts.get("/", async (req, res) => {
  const { category, featured, search } = req.query;
  const where: any = { isAvailable: true };
  if (category) where.category = String(category);
  if (featured === "true") where.isFeatured = true;
  if (search)
    where.OR = [
      { name: { contains: String(search), mode: "insensitive" } },
      { description: { contains: String(search), mode: "insensitive" } },
    ];
  res.json(await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } }));
});

publicProducts.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

function pick(b: any) {
  const d: any = {};
  for (const k of ["name", "description", "price", "category", "images", "tokopediaUrl", "shopeeUrl", "isFeatured", "isAvailable"])
    if (b[k] !== undefined) d[k] = b[k];
  return d;
}

adminProducts.get("/", async (_req, res) => {
  res.json(await prisma.product.findMany({ orderBy: { createdAt: "desc" } }));
});
adminProducts.post("/", async (req, res) => {
  const d = pick(req.body || {});
  if (!d.name || d.price === undefined || !d.category) return res.status(400).json({ error: "name, price, category required" });
  res.status(201).json(await prisma.product.create({ data: d }));
});
adminProducts.put("/:id", async (req, res) => {
  try {
    res.json(await prisma.product.update({ where: { id: Number(req.params.id) }, data: pick(req.body || {}) }));
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});
adminProducts.delete("/:id", async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

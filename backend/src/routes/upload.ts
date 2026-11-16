import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { requireAuth } from "../middleware/auth";

const DIR = process.env.UPLOAD_DIR || "/app/uploads";
fs.mkdirSync(DIR, { recursive: true });

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: DIR,
    filename: (_req, file, cb) => cb(null, crypto.randomBytes(12).toString("hex") + ALLOWED[file.mimetype]),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, !!ALLOWED[file.mimetype]),
});

const r = Router();
r.post("/", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Image file required (jpg/png/webp/gif, max 5MB), field name 'image'" });
  res.status(201).json({ url: `/uploads/${path.basename(req.file.path)}`, filename: req.file.filename });
});

export default r;

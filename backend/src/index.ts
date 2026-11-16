import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import { publicProducts, adminProducts } from "./routes/products";
import { publicContent, adminContent } from "./routes/content";
import { publicTestimonials, adminTestimonials } from "./routes/testimonials";
import { publicInquiries, adminInquiries } from "./routes/inquiries";
import faqRoutes from "./routes/faq";
import uploadRoutes from "./routes/upload";
import chatbotRoutes from "./routes/chatbot";
import changePasswordRouter from './routes/change-password';

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "/app/uploads"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", publicProducts);
app.use("/api/content", publicContent);
app.use("/api/testimonials", publicTestimonials);
app.use("/api/inquiries", publicInquiries);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/admin/products", adminProducts);
app.use("/api/admin/content", adminContent);
app.use("/api/admin/testimonials", adminTestimonials);
app.use("/api/admin/inquiries", adminInquiries);
app.use("/api/admin/faq", faqRoutes);
app.use("/api/admin/upload", uploadRoutes);
app.use("/api", changePasswordRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));

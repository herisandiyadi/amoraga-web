import { Router } from "express";
import { handleChat } from "../services/chatbot";

const r = Router();
r.post("/", async (req, res) => {
  const { message, history, name, contact } = req.body || {};
  if (!message || typeof message !== "string" || message.length > 2000)
    return res.status(400).json({ error: "message (string, max 2000 chars) required" });
  try {
    res.json(await handleChat({ message, history, name, contact }));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Chat failed" });
  }
});
export default r;

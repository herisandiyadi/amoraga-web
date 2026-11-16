import { prisma } from '../db';

interface ChatbotConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

async function getConfig(): Promise<ChatbotConfig> {
  const config = await prisma.content.findUnique({ where: { key: 'chatbot_config' } });
  const val = config?.value as any || {};
  return {
    baseUrl: val.baseUrl || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    apiKey: val.apiKey || process.env.OPENAI_API_KEY || '',
    model: val.model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
  };
}

async function matchFaq(message: string): Promise<string | null> {
  const faqs = await prisma.chatbotFaq.findMany();
  const msgWords = message.toLowerCase().split(/\s+/);
  
  for (const faq of faqs) {
    const qWords = faq.question.toLowerCase().split(/\s+/);
    const matches = msgWords.filter(w => qWords.some(q => q.includes(w) || w.includes(q)));
    if (matches.length / Math.max(msgWords.length, 1) >= 0.5) {
      return faq.answer;
    }
  }
  return null;
}

async function getProductCatalog(): Promise<string> {
  const products = await prisma.product.findMany({ 
    where: { isAvailable: true },
    select: { name: true, description: true, price: true, category: true }
  });
  
  if (products.length === 0) {
    return "Katalog produk: Cermin standing, cermin dinding, frame kayu, frame metal, cermin LED, cermin abstrak. Hubungi kami untuk detail dan harga.";
  }
  
  return products.map(p => 
    `- ${p.name} (${p.category || 'Mirror'}): ${p.description || ''} - Rp ${p.price?.toString() || 'Contact for price'}`
  ).join('\n');
}

async function callOpenAI(message: string, history: Array<{role: string; content: string}>): Promise<string> {
  const cfg = await getConfig();
  
  if (!cfg.apiKey) {
    return "Silakan hubungi kami via WhatsApp 0812-3448-0282 untuk informasi lebih lanjut tentang produk kami.";
  }

  const catalog = await getProductCatalog();
  
  const systemPrompt = `Kamu adalah asisten customer service Amoraga Creative, toko cermin dan kaca premium.

ATURAN KETAT:
0. JANGAN pernah menyebut nama lain selain "Amoraga Creative". Jangan sebut "Rizfaworkshop" atau nama toko lain.
1. HANYA jawab pertanyaan tentang produk cermin/kaca, harga, ukuran, warna, pengiriman, dan pemesanan.
2. TOLAK dengan sopan pertanyaan di luar topik produk (teknologi, coding, umum, dll).
3. Jika pertanyaan tidak terkait produk, jawab: "Maaf, saya hanya bisa membantu tentang produk cermin dan kaca kami. Ada yang ingin ditanyakan tentang produk kami?"

PRODUK TERSEDIA:
${catalog}

INFORMASI PENTING:
- WhatsApp: 0812-3448-0282
- Warna frame: Hitam, Putih, Gold, Silver, Natural Kayu, Coklat Gelap
- Pengiriman: Seluruh Indonesia dengan packing aman
- Produksi custom: 7-14 hari kerja

Jawab dalam Bahasa Indonesia, singkat dan helpful.`;

  try {
    const response = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.slice(-6),
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status);
      return "Silakan hubungi kami via WhatsApp 0812-3448-0282 untuk informasi produk.";
    }

    const text = await response.text();
    const cleanJson = text.replace(/\s*data:\s*\[DONE\]\s*$/i, '').trim();
    const data = JSON.parse(cleanJson);
    return data.choices?.[0]?.message?.content || "Silakan hubungi WhatsApp 0812-3448-0282.";
  } catch (error) {
    console.error('Chatbot error:', error);
    return "Silakan hubungi kami via WhatsApp 0812-3448-0282 untuk informasi produk.";
  }
}

export async function handleChat(opts: {
  message: string;
  history?: Array<{role: string; content: string}>;
  name?: string;
  contact?: string;
}): Promise<{reply: string; source: string}> {
  const { message, history = [], name, contact } = opts;

  // First try FAQ match
  const faqReply = await matchFaq(message);
  if (faqReply) {
    if (name && contact) {
      await prisma.inquiry.create({
        data: {
          source: "chatbot",
          name,
          contact,
          message,
          conversation: [...history, { role: "user", content: message }, { role: "assistant", content: faqReply }] as any,
        },
      });
    }
    return { reply: faqReply, source: "faq" };
  }

  // Fallback to AI (restricted to product only)
  const aiReply = await callOpenAI(message, history);
  if (name && contact) {
    await prisma.inquiry.create({
      data: {
        source: "chatbot",
        name,
        contact,
        message,
        conversation: [...history, { role: "user", content: message }, { role: "assistant", content: aiReply }] as any,
      },
    });
  }
  return { reply: aiReply, source: "ai" };
}

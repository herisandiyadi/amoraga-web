// Server-side uses internal Docker URL, client uses relative (proxied by nginx)
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';  // Browser: relative URL
  return 'http://backend:4000';  // Server: Docker internal
};

export async function fetchProducts(params?: { category?: string; featured?: boolean; search?: string }) {
  const base = getBaseUrl();
  const url = new URL(`${base}/api/products`, base || 'http://localhost:3000');
  if (params?.category) url.searchParams.set('category', params.category);
  if (params?.featured) url.searchParams.set('featured', 'true');
  if (params?.search) url.searchParams.set('search', params.search);
  const res = await fetch(url.toString(), { cache: 'no-store' });
  return res.json();
}

export async function fetchProduct(id: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/products/${id}`, { cache: 'no-store' });
  return res.json();
}

export async function fetchContent(key: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/content/${key}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchTestimonials() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/testimonials`, { cache: 'no-store' });
  return res.json();
}

export async function submitInquiry(data: { source: string; name: string; contact: string; message: string }) {
  const res = await fetch(`/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function chatbotMessage(data: { message: string; name?: string; contact?: string; history?: Array<{role: string; content: string}> }) {
  const res = await fetch(`/api/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Admin functions - client-side only
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  return res.json();
}

export async function adminUpload(file: File) {
  const token = getToken();
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`/api/admin/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}

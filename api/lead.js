// Vercel serverless function: receives the quote form, emails it via Resend,
// and stores a backup copy in Supabase. Email is the primary channel, so a
// paused Supabase project can no longer lose a lead.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   – Resend API key
//   LEAD_TO_EMAIL    – where leads go (comma-separated for several)
// Optional:
//   LEAD_FROM_EMAIL  – verified sender, e.g. "Bobi Group <zayavki@bobi-group.com>"
//                      (defaults to Resend's test sender, which only delivers
//                      to the Resend account owner's own address)
//   SUPABASE_URL / SUPABASE_KEY – backup storage (defaults to the existing project)

const SB_URL = process.env.SUPABASE_URL || 'https://redcsbztdpsfysjcpral.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY || 'sb_publishable_VeJpNd4-0NmCTzHfdyM_-Q_fndUG-vX';

const SERVICES = ['Къртене & Демонтаж', 'Почистване', 'Извозване', 'Комплексна услуга'];

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function clean(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

async function sendEmail(lead) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_TO_EMAIL || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!key || to.length === 0) throw new Error('email not configured');

  const from = process.env.LEAD_FROM_EMAIL || 'Bobi Group <onboarding@resend.dev>';
  const tel = lead.phone.replace(/[^\d+]/g, '');
  const when = new Date().toLocaleString('bg-BG', { timeZone: 'Europe/Sofia' });

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5">
      <h2 style="margin:0 0 12px">Нова заявка от сайта</h2>
      <p><b>Име:</b> ${esc(lead.name)}</p>
      <p><b>Телефон:</b> <a href="tel:${esc(tel)}" style="font-size:20px">${esc(lead.phone)}</a></p>
      <p><b>Услуга:</b> ${esc(lead.service)}</p>
      <p><b>Бележки:</b> ${lead.message ? esc(lead.message).replace(/\n/g, '<br>') : '—'}</p>
      <p style="color:#888;font-size:13px">Получена: ${esc(when)} · bobi-group.com</p>
      <p><a href="tel:${esc(tel)}" style="display:inline-block;background:#00C48C;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Обади се сега</a></p>
    </div>`;

  const text =
    `Нова заявка от сайта\n\nИме: ${lead.name}\nТелефон: ${lead.phone}\nУслуга: ${lead.service}\n` +
    `Бележки: ${lead.message || '—'}\n\nПолучена: ${when}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      subject: `Нова заявка: ${lead.service} – ${lead.name}`,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function saveBackup(lead) {
  const res = await fetch(`${SB_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    service: clean(body.service, 50),
    message: clean(body.message, 2000),
  };

  if (!lead.name || !lead.phone || !SERVICES.includes(lead.service)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }
  if (lead.phone.replace(/\D/g, '').length < 6) {
    return res.status(400).json({ ok: false, error: 'phone' });
  }

  const [email, backup] = await Promise.allSettled([sendEmail(lead), saveBackup(lead)]);
  if (email.status === 'rejected') console.error('lead email failed:', email.reason?.message);
  if (backup.status === 'rejected') console.error('lead backup failed:', backup.reason?.message);

  // Success only when the email went out: a lead that is merely stored but
  // notifies nobody is exactly the failure we are fixing. If the email fails,
  // the visitor is told to call, and the backup copy (if saved) is still there.
  if (email.status === 'fulfilled') return res.status(200).json({ ok: true });
  return res.status(502).json({ ok: false, saved: backup.status === 'fulfilled' });
};

// Access-token gate used only when the server is bound to a network interface.
// Each successful login gets its own random session token. Tokens live in memory only
// (a restart signs everyone out), expire after SESSION_IDLE_MS without use, and are capped
// at SESSION_MAX; when full, the least recently used session is dropped.
import { timingSafeEqual, randomBytes, createHash } from 'node:crypto';
import { NETWORK_MODE, ACCESS_TOKEN, COOKIE_SECURE, SESSION_IDLE_MS, SESSION_MAX } from './config.mjs';
import { send, safeHeaders, rateLimit } from './http.mjs';

const COOKIE_NAME = 'mors_session';
const COOKIE_ATTRIBUTES = `HttpOnly; SameSite=Strict; Path=/${COOKIE_SECURE ? '; Secure' : ''}`;

function equalSecret(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

// Sessions are keyed by the SHA-256 digest of the token, so lookup time does not depend on
// how much of a guessed token matches, and the raw tokens are never kept in memory.
// Map order is least- to most-recently used.
const sessions = new Map();
const digest = token => createHash('sha256').update(token).digest('hex');

function sessionCookie(req) {
  const part = String(req.headers.cookie || '').split(';').map(item => item.trim()).find(item => item.startsWith(`${COOKIE_NAME}=`));
  const value = part ? part.slice(COOKIE_NAME.length + 1) : '';
  return /^[0-9a-f]{64}$/.test(value) ? value : '';
}

function pruneExpired(now) {
  for (const [key, lastSeen] of sessions) {
    if (now - lastSeen < SESSION_IDLE_MS) break; // remaining entries were used more recently
    sessions.delete(key);
  }
}

function createSession() {
  const now = Date.now();
  pruneExpired(now);
  while (sessions.size >= SESSION_MAX) sessions.delete(sessions.keys().next().value);
  const token = randomBytes(32).toString('hex');
  sessions.set(digest(token), now);
  return token;
}

export function hasSession(req) {
  if (!NETWORK_MODE) return true;
  const token = sessionCookie(req);
  if (!token) return false;
  const now = Date.now();
  pruneExpired(now);
  const key = digest(token);
  if (!sessions.has(key)) return false;
  sessions.delete(key); // re-insert to mark as most recently used
  sessions.set(key, now);
  return true;
}

export function loginPage(failed = false) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="color-scheme" content="dark">
  <title>MORS AEGIS access</title>
  <style>
    :root{color-scheme:dark;font-family:Manrope,"Noto Sans",system-ui,sans-serif;background:#071426;color:#e5f1fa;font-synthesis:none}
    *{box-sizing:border-box}
    body{min-height:100vh;min-height:100svh;margin:0;display:grid;place-items:center;padding:24px;background-color:#071426;background-image:radial-gradient(circle at 13% 18%,#61d3f533 1px,transparent 2px),radial-gradient(circle at 82% 27%,#61d3f522 1px,transparent 2px),radial-gradient(circle at 70% 79%,#61d3f522 1px,transparent 2px),radial-gradient(circle at 27% 84%,#61d3f51c 1px,transparent 2px),radial-gradient(ellipse at 50% 0%,#123b5c 0%,#071426 68%)}
    main{width:min(100%,430px);padding:32px;border:1px solid #31556e;border-radius:22px;background:linear-gradient(145deg,#10253aee,#091827f5);box-shadow:0 24px 70px #0008}
    .brand{display:flex;align-items:center;gap:13px;margin-bottom:30px}
    .mark{width:48px;height:48px;display:grid;place-items:center;border:1px solid #74d8f277;border-radius:15px;background:#0c304a;color:#8ae2fb;font-size:23px;font-weight:800}
    .brand strong{display:block;font-size:14px;letter-spacing:.12em}.brand strong span{color:#72d1ee}
    .brand small{display:block;margin-top:5px;color:#88a7bf;font-size:9px;letter-spacing:.18em}
    .eyebrow{margin:0 0 8px;color:#78d8f3;font-size:10px;letter-spacing:.15em;text-transform:uppercase}
    h1{margin:0;color:#f0f8fc;font-size:clamp(22px,6vw,28px);letter-spacing:-.035em}
    .intro{margin:12px 0 25px;color:#acc1d1;font-size:14px;line-height:1.65}
    label{display:block;margin-bottom:8px;color:#d4e5ef;font-size:12px;font-weight:650}
    input{width:100%;min-height:48px;padding:11px 13px;border:1px solid #4a6c82;border-radius:11px;outline:none;background:#061321;color:#f4fbff;font:inherit;font-size:16px;letter-spacing:.08em}
    input:focus{border-color:#5bc8e8;box-shadow:0 0 0 3px #52c6e833}
    button{width:100%;min-height:48px;margin-top:15px;border:0;border-radius:11px;background:#56c7e8;color:#062033;font:inherit;font-size:14px;font-weight:750;cursor:pointer}
    button:hover{background:#86def4}button:focus-visible{outline:3px solid #d4f4ff;outline-offset:3px}
    .error{margin:0 0 16px;padding:11px 12px;border:1px solid #a95861;border-radius:10px;background:#45252d;color:#ffdce0;font-size:13px;line-height:1.5}
    .note{margin:18px 0 0;color:#7996aa;font-size:10px;line-height:1.55}
    @media(max-width:420px){main{padding:25px 21px}}
  </style>
</head>
<body>
  <main aria-labelledby="page-title">
    <div class="brand"><div class="mark" aria-hidden="true">M</div><div><strong>MORS <span>AEGIS</span></strong><small>FLAME IN FREEFALL</small></div></div>
    <p class="eyebrow">Research workspace</p>
    <h1 id="page-title">Enter the access code</h1>
    <p class="intro">The research workspace loads after the code is verified.</p>
    ${failed ? '<p class="error" role="alert">The access code was not accepted. Check it and try again.</p>' : ''}
    <form method="post" action="/api/auth" autocomplete="off">
      <label for="access-token">Access code</label>
      <input id="access-token" name="token" type="password" required autocomplete="off" autocapitalize="none" spellcheck="false">
      <button type="submit">Open workspace</button>
    </form>
    <p class="note">Your code is sent securely to this site and is never placed in the page URL.</p>
  </main>
</body>
</html>`;
}

export async function authenticate(req, res) {
  const ip = req.socket.remoteAddress || 'unknown';
  if (!rateLimit(`${ip}:auth`, 5)) return send(res, 429, { error: 'Too many access attempts.' });
  if (String(req.headers['content-type'] || '').split(';')[0] !== 'application/x-www-form-urlencoded') return send(res, 415, { error: 'Form encoding required.' });
  let size = 0, body = '';
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 4096) return send(res, 413, { error: 'Access request is too large.' });
    body += chunk.toString('utf8');
  }
  const supplied = new URLSearchParams(body).get('token') || '';
  if (!equalSecret(supplied, ACCESS_TOKEN)) return send(res, 401, loginPage(true), 'text/html; charset=utf-8');
  // Browser-session cookie (no Max-Age): the server enforces the sliding idle timeout.
  res.writeHead(303, { ...safeHeaders('text/html; charset=utf-8'), location: '/', 'set-cookie': `${COOKIE_NAME}=${createSession()}; ${COOKIE_ATTRIBUTES}` });
  res.end();
}

/** POST /api/logout: forget the caller's session (if any) and clear the cookie. */
export function logout(req, res) {
  const token = sessionCookie(req);
  if (token) sessions.delete(digest(token));
  res.writeHead(204, { ...safeHeaders('text/plain; charset=utf-8'), 'set-cookie': `${COOKIE_NAME}=; Max-Age=0; ${COOKIE_ATTRIBUTES}` });
  res.end();
}

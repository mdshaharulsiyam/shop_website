// Helper: Base64 URL Encode
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Helper: Base64 URL Decode
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return atob(str);
}

// Create HMAC SHA256 signature
async function createHmacSHA256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  const b64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return b64;
}

// Create JWT
async function createJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));

  const signature = await createHmacSHA256(`${headerEncoded}.${payloadEncoded}`, secret);
  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

// Verify JWT
async function verifyJWT<T = Record<string, unknown>>(token: string, secret: string): Promise<T> {
  const [headerEncoded, payloadEncoded, signature] = token.split('.');
  const expectedSignature = await createHmacSHA256(`${headerEncoded}.${payloadEncoded}`, secret);

  if (expectedSignature !== signature) {
    throw new Error('Invalid token or secret key');
  }

  return JSON.parse(base64UrlDecode(payloadEncoded)) as T;
}
console.log("Decoded:", await verifyJWT("your_jwt_token", "my_secret_key"));
console.log("Decoded:", await createJWT({}, "my_secret_key"));
// // Example usage
// (async () => {
//   const secret = "my_secret_key"; // ⚠️ Don't expose in production!
//   const token = await createJWT({ userId: 1, role: "admin" }, secret);
//   console.log("Token:", token);

//   try {
//     const data = await verifyJWT<{ userId: number; role: string }>(token, secret);
//     console.log("Decoded:", data);
//   } catch (err) {
//     console.error((err as Error).message);
//   }
// })();

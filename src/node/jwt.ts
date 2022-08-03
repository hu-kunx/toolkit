import {HMAC_SHA256} from '../shared/security/hash';
import {IncomingHttpHeaders} from 'http';
import {safeStringCompare} from '../shared/security/compare';

function hexToJwtBase64(hex: string) {
  const base64 = Buffer.from(hex, 'hex').toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

interface HttpError extends Error {
  status: number;
}

function throw401Error(msg: string): never {
  const error = new Error(msg) as HttpError;
  error.name = 'AuthorizationError';
  error.status = 401;
  throw error;
}

function safeParseJson<T>(text: string): T | null {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export function decodeHeader<T>(token: string): T | null {
  const header = token.split('.', 1)[0];
  if (!header) {
    return null;
  }
  return safeParseJson<T>(Buffer.from(header, 'base64').toString('utf-8'));
}

export function decodePayload<T>(token: string): T | null {
  const payload = token.split('.', 2)[1];
  if (!payload) {
    return null;
  }
  return safeParseJson<T>(Buffer.from(payload, 'base64').toString('utf-8'));
}

export function resolveTokenByHeader(headers: IncomingHttpHeaders) {
  if (!headers.authorization) {
    throw401Error('Not found Token!');
  }
  const [bearer, token] = headers.authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw401Error("Bad Authorization header format. Format is 'Authorization: Bearer <token>'");
  }
  return token;
}

export function verifySignature(token: string, secret: string): boolean {
  const [header, payload, sign] = (token || '').split('.');
  if (!header || !payload || !sign) {
    return false;
  }
  const text = header + '.' + payload;
  return safeStringCompare(hexToJwtBase64(HMAC_SHA256(text, secret)), sign);
}

export function verifyIsExpired(token: string) {
  const payload = decodePayload<{exp: number; iat: number}>(token);
  if (payload === null) {
    return true;
  }
  return Math.floor(Date.now() / 1000) >= payload.exp;
}

export function verify<T extends {exp: number; iat: number}>(token: string, secret: string) {
  if (!verifySignature(token, secret)) {
    return null;
  }
  const payload = decodePayload<T>(token);
  if (payload === null || Math.floor(Date.now() / 1000) >= payload.exp) {
    return null;
  }
  return payload;
}

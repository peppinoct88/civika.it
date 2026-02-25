import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from "jose";
import type { JWTPayload, PermissionEntry } from "@/types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!
);

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

/**
 * Genera un access token JWT (durata: 15 minuti)
 */
export async function signAccessToken(payload: {
  sub: string;
  email: string;
  roles: string[];
  permissions: PermissionEntry[];
}): Promise<string> {
  return new SignJWT({
    email: payload.email,
    roles: payload.roles,
    permissions: payload.permissions,
  } as unknown as JoseJWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setIssuer("civika.it")
    .setAudience("civika.it")
    .sign(JWT_SECRET);
}

/**
 * Genera un refresh token (durata: 7 giorni)
 */
export async function signRefreshToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setIssuer("civika.it")
    .sign(JWT_REFRESH_SECRET);
}

/**
 * Verifica e decodifica un access token
 */
export async function verifyAccessToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "civika.it",
      audience: "civika.it",
    });
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Verifica e decodifica un refresh token
 */
export async function verifyRefreshToken(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET, {
      issuer: "civika.it",
    });
    return { sub: payload.sub as string };
  } catch {
    return null;
  }
}

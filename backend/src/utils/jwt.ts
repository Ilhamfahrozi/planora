import jwt, { type SignOptions } from "jsonwebtoken"
import { env } from "../config/env.js"

// ─── Payload Type ────────────────────────────────────────────────────────────
export type JwtPayload = {
  userId: string
  role: string
}

// ─── Sign Tokens ─────────────────────────────────────────────────────────────
export const signAccessToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as unknown as number,
  }
  return jwt.sign(payload, env.JWT_SECRET, options)
}

export const signRefreshToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as unknown as number,
  }
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options)
}

// ─── Verify Tokens ───────────────────────────────────────────────────────────
export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload
}

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload
}
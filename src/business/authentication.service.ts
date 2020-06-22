import jwks, { SigningKey } from "jwks-rsa";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { Request } from "express";
import * as usersService from "./users.service";
import { User } from "../entities/users.models";

export function getUserFromToken(token: string, authenticatorId: string): Promise<User | null> {
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return Promise.resolve(null);
  }
  return usersService.getByAuthenticationId(decodedToken.sub, authenticatorId);
}

export function extractTokenFromHeader(req: Request): string | null {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return null;
  }

  const words = authorization.split(" ");
  if (words.length !== 2) {
    return null;
  }

  return words[1];
}

export async function verifyToken(token: string, authenticationPublicKeyUrl: string): Promise<boolean> {
  try {
    const client = jwks({ jwksUri: authenticationPublicKeyUrl });
    const getSigningKeys = promisify(client.getSigningKeys.bind(client));
    const keys = await getSigningKeys();

    const publicKey = getFirstPublicKey(keys);
    if (!publicKey) {
      return false;
    }

    // exception thrown: jwt malformed, jwt expired
    jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    });
    return true;
  } catch (error) {
    logger.error(`There was an error while verfying the token: ${error}`);
    return false;
  }
}

function getFirstPublicKey(keys: SigningKey[]): string | null {
  const key = keys[0];
  if (!key) {
    return null;
  }
  if ("publicKey" in key) {
    return key.publicKey;
  }
  if ("rsaPublicKey" in key) {
    return key.rsaPublicKey;
  }
  return null;
}

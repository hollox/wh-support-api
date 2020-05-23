import jwks, { SigningKey } from "jwks-rsa";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import axios, { AxiosResponse } from "axios";
import { UserInformation } from "./authentication.models";
import { Request } from "express";
import { User } from "../users/users.models";
import * as usersService from "../users/users.service";

export async function authenticateByUserToken(
  req: Request
): Promise<User | null> {
  const token = extractTokenFromHeader(req);
  const authorized = await verifyToken(token);

  if (!authorized) return null;

  try {
    const userInformation = await getUserInformation(token);
    return usersService.getByAuthenticationId(userInformation.sub;
  } catch (error) {
    return null;
  }
}

function extractTokenFromHeader(req: Request): string | null {
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

async function verifyToken(token: string): Promise<boolean> {
  const client = jwks({ jwksUri: jwksUrl });
  const getSigningKeys = promisify(client.getSigningKeys.bind(client));
  const keys = await getSigningKeys();

  const publicKey = getFirstPublicKey(keys);
  if (!publicKey) return false;

  // exception thrown: jwt malformed, jwt expired
  try {
    jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    });

    return true;
  } catch (err) {
    logger.error(`There was an error while verfying the token: ${err}`);
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

function getUserInformation(
  authenticationInfoUrl: string,
  token: string
): Promise<UserInformation> {
  return axios({
    url: authenticationInfoUrl,
    method: "get",
    params: {
      access_token: token
    }
  }).then((response: AxiosResponse<UserInformation>) => {
    return response.data;
  });
}

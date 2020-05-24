import jwks, { SigningKey } from "jwks-rsa";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import axios from "axios";
import {
  UserInformation,
  UserInformationResponse
} from "./authentication.models";
import { Request } from "express";
import { User } from "../users/users.models";
import * as usersService from "../users/users.service";
import { Configuration } from "../configuration/configuration.model";

export async function authenticateByUserToken(
  req: Request
): Promise<User | null> {
  const token = extractTokenFromHeader(req);
  if (!token) {
    return null;
  }
  const configuration = req.app.locals.configuration as Configuration;
  const authorized = await verifyToken(
    token,
    configuration.authentication.publicKeyUrl
  );
  if (!authorized) {
    return null;
  }

  try {
    const userInformation = await getUserInformation(
      token,
      configuration.authentication.infoUrl
    );
    return usersService.getByAuthenticationId(
      userInformation.userId,
      configuration.authentication.authenticatorId
    );
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

async function verifyToken(
  token: string,
  authenticationPublicKeyUrl: string
): Promise<boolean> {
  const client = jwks({ jwksUri: authenticationPublicKeyUrl });
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
  token: string,
  authenticationInfoUrl: string
): Promise<UserInformation> {
  return axios({
    url: authenticationInfoUrl,
    method: "get",
    params: {
      access_token: token
    }
  }).then(response => {
    return convertResponseToModel(response.data);
  });
}

function convertResponseToModel(
  userInformationResponse: UserInformationResponse
): UserInformation {
  return {
    userId: userInformationResponse.sub,
    email: userInformationResponse.email,
    emailVerified: userInformationResponse.email_verified
  };
}

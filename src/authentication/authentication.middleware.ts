import { Request, Response, NextFunction } from "express";
import { constants } from "http2";
import * as authenticationServer from "./authentication.service";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authenticatedUser = await authenticationServer.authenticateByUserToken(
      req
    );
    if (authenticatedUser) {
      res.locals.authenticatedUser = authenticatedUser;
      next();
    } else {
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();
    }
  } catch (error) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).end();
  }
}

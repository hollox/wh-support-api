import { Request, Response } from "express";
import { constants } from "http2";

export async function createTicket(
  _req: Request,
  res: Response
): Promise<void> {
  return res.status(constants.HTTP_STATUS_CREATED).end();
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  res.locals.authenticatedUser.res
    .status(constants.HTTP_STATUS_OK)
    .json(tickets);
}

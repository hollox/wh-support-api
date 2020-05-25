import { Request, Response } from "express";
import { constants } from "http2";
import { User } from "../users/users.models";
import * as ticketsService from "./tickets.service";

export async function createTicket(
  _req: Request,
  res: Response
): Promise<void> {
  return res.status(constants.HTTP_STATUS_CREATED).end();
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  const authenticatedUser = res.locals.authenticatedUser as User;

  const tickets = await ticketsService.getAll(authenticatedUser);

  res.status(constants.HTTP_STATUS_OK).json(tickets);
}

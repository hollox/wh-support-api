import { Request, Response } from "express";
import { constants } from "http2";

export async function createTicket(
  _req: Request,
  res: Response
): Promise<void> {
  return res.status(constants.HTTP_STATUS_CREATED).end();
}

export async function getTickets(_req: Request, res: Response): Promise<void> {
  console.log({ getTickets: res.locals.authenticatedUser });
  const tickets = [
    {
      ticket_id: 1,
      description: "life is good!"
    },
    {
      ticket_id: 2,
      description: "life is awesome!"
    }
  ];
  res.status(constants.HTTP_STATUS_OK).json(tickets);
}

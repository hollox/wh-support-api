import { Request, Response } from "express";
import { constants } from "http2";

export function createTicket(_req: Request, res: Response) {
  return res.status(constants.HTTP_STATUS_CREATED).end();
}

export function getTickets(_req: Request, res: Response) {
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
  return res.status(constants.HTTP_STATUS_OK).json(tickets);
}

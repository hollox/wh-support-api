import { Request, Response } from "express";
import { constants } from "http2";

export function createOrganization(_req: Request, res: Response) {
  return res.status(constants.HTTP_STATUS_CREATED).end();
}

export function getOrganizations(_req: Request, res: Response) {
  const tickets = [
    {
      organization_id: 1,
      name: "Cool inc."
    },
    {
      organization_id: 2,
      description: "Awesome limited"
    }
  ];
  return res.status(constants.HTTP_STATUS_OK).json(tickets);
}

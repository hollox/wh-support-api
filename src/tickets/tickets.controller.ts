import { Request, Response } from "express";
import { constants } from "http2";
import { User } from "../users/users.models";
import * as ticketsService from "./tickets.service";
import { requiredOptions } from "../utils/validations";
import { getDetailsFromError } from "../utils/errors";
import { getTicketByIdSchema, saveTicketSchema } from "./tickets.models";
import * as ticketsHelper from "./tickets.helper";

export async function getAll(_req: Request, res: Response): Promise<void> {
  const authenticatedUser = res.locals.authenticatedUser as User;

  const tickets = await ticketsService.getAll(authenticatedUser);
  const ticketJson = ticketsHelper.convertModelsToJson(tickets);

  res.status(constants.HTTP_STATUS_OK).json(ticketJson);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const validationResult = getTicketByIdSchema.validate(
    req.params,
    requiredOptions
  );
  const { error, value: ticketInputJson } = validationResult;
  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const ticket = await ticketsService.getById(ticketInputJson.ticket_id);

    const ticketJson = ticket ? ticketsHelper.convertModelToJson(ticket) : null;
    res.status(constants.HTTP_STATUS_OK).json(ticketJson);
  }
}

export async function save(req: Request, res: Response): Promise<void> {
  const validationResult = saveTicketSchema.validate(req.body, requiredOptions);
  const { error, value: saveTicketInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const ticket = ticketsHelper.convertJsonToModel(saveTicketInputJson);
    const savedTicket = await ticketsService.save(ticket);
    const savedTicketJson = ticketsHelper.convertModelToJson(savedTicket);

    res.status(constants.HTTP_STATUS_OK).json(savedTicketJson);
  }
}

import { Request, Response } from "express";
import { constants } from "http2";
import { User } from "../../entities/users.models";
import * as ticketsService from "../../business/tickets.service";
import { requiredOptions } from "../validations";
import { getDetailsFromError } from "../errors";
import { getTicketByIdSchema, saveTicketSchema, STATUS_COMPLETED } from "./tickets.models";
import * as ticketsHelper from "./tickets.helper";

export async function getAll(_req: Request, res: Response): Promise<void> {
  const authenticatedUser = res.locals.authenticatedUser as User;
  const tickets = await ticketsService.getAll(authenticatedUser);
  const ticketJson = ticketsHelper.convertModelsToJson(tickets);

  res.status(constants.HTTP_STATUS_OK).json(ticketJson);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const validationResult = getTicketByIdSchema.validate(req.params, requiredOptions);
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

export async function setStatus(req: Request, res: Response): Promise<void> {
  const ticketId = req.params.ticket_id;
  const statusId = req.body.status_id;

  if (!statusId) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: "status_id is required" });
    return;
  }
  if (!ticketId) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: "ticket_id is required" });
    return;
  }
  const ticket = await ticketsService.getById(ticketId);
  if (!ticket) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: `No ticket found with id ${ticketId}` });
  } else if (ticket.statusId === STATUS_COMPLETED) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: "Invalid status: Ticket is completed" });
  } else {
    ticketsService.setStatus(ticketId, statusId);
    res.status(constants.HTTP_STATUS_NO_CONTENT).end();
  }
}

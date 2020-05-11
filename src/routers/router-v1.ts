import { Router } from "express";
import { createTicket, getTickets } from "../tickets/tickets.controller";

export const routerV1 = Router();

// routerV1.use(authenticate);

routerV1.get("/tickets", getTickets);
routerV1.post("/tickets", createTicket);

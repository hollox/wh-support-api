import { Router } from "express";
import { createTicket, getTickets } from "../tickets/tickets.controller";
import { checkJwt } from "../jwt/jwt.middleware";
import {
  createOrganization,
  getOrganizations
} from "../organizations/organizations.controller";

export const routerV1 = Router();

routerV1.use(checkJwt);

routerV1.get("/organizations", getOrganizations);
routerV1.post("/organizations", createOrganization);

routerV1.get("/tickets", getTickets);
routerV1.post("/tickets", createTicket);

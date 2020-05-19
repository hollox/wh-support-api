import { Router } from "express";
import { createTicket, getTickets } from "../tickets/tickets.controller";
import { checkJwt } from "../jwt/jwt.middleware";
import {
  saveOrganization,
  getOrganizations,
  getOrganizationById
} from "../organizations/organizations.controller";
import { handleErrors } from "../utils/errors";

export const routerV1 = Router();

routerV1.use(checkJwt);

routerV1.get("/organizations", handleErrors(getOrganizations));
routerV1.get(
  "/organizations/:organization_id",
  handleErrors(getOrganizationById)
);
routerV1.post("/organizations", handleErrors(saveOrganization));

routerV1.get("/tickets", handleErrors(getTickets));
routerV1.post("/tickets", handleErrors(createTicket));

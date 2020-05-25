import { Router } from "express";
import * as ticketsController from "../tickets/tickets.controller";
import * as organizationsController from "../organizations/organizations.controller";
import { handleErrors } from "../utils/errors";
import * as usersController from "../users/users.controller";
import * as authenticationMiddleware from "../authentication/authentication.middleware";

export const routerV1 = Router();

routerV1.use(authenticationMiddleware.authenticate);

routerV1.get("/organizations", handleErrors(organizationsController.getAll));
routerV1.get(
  "/organizations/:organization_id",
  handleErrors(organizationsController.getById)
);
routerV1.post("/organizations", handleErrors(organizationsController.save));

routerV1.get("/tickets", handleErrors(ticketsController.getAll));
routerV1.post("/tickets", handleErrors(ticketsController.createTicket));

routerV1.post("/users", handleErrors(usersController.save));

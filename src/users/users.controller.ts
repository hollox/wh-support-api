import { Request, Response } from "express";
import { requiredOptions } from "../utils/validations";
import { getDetailsFromError } from "../utils/errors";
import { constants } from "http2";
import * as usersHelper from "./users.helper";
import * as usersService from "../users/users.service";
import { saveUserSchema, getUsersByOrganizationIdSchema } from "./users.models";

export async function getByOrganizationId(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = getUsersByOrganizationIdSchema.validate(
    req.params,
    requiredOptions
  );
  const { error, value: organizationInputJson } = validationResult;
  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const users = await usersService.getByOrganizationId(
      organizationInputJson.organization_id
    );
    const usersJson = users ? usersHelper.convertModelsToJson(users) : null;
    res.status(constants.HTTP_STATUS_OK).json(usersJson);
  }
}

export async function save(req: Request, res: Response): Promise<void> {
  const validationResult = saveUserSchema.validate(req.body, requiredOptions);
  const { error, value: userInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const user = usersHelper.convertJsonToModel(userInputJson);
    const savedUser = await usersService.save(user);
    const savedUserJson = usersHelper.convertModelToJson(savedUser);

    res.status(constants.HTTP_STATUS_OK).json(savedUserJson);
  }
}

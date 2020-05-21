import { Request, Response } from "express";
import { requiredOptions } from "../utils/validations";
import { getDetailsFromError } from "../utils/errors";
import { constants } from "http2";
import {
  convertJsonToModel,
  convertModelsToJson,
  convertModelToJson
} from "./users.helper";
import * as service from "../users/users.service";
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
    const users = await service.getUsersByOrganizationId(
      organizationInputJson.organization_id
    );
    const usersJson = users ? convertModelsToJson(users) : null;
    res.status(constants.HTTP_STATUS_OK).json(usersJson);
  }
}

export async function saveUser(req: Request, res: Response): Promise<void> {
  const validationResult = saveUserSchema.validate(req.body, requiredOptions);
  const { error, value: userInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const user = convertJsonToModel(userInputJson);
    const savedUser = await service.saveUser(user);
    const savedUserJson = convertModelToJson(savedUser);
    console.log({ user, savedUser, savedUserJson });
    res.status(constants.HTTP_STATUS_OK).json(savedUserJson);
  }
}

import { Request, Response } from "express";
import { requiredOptions } from "../../utils/validations";
import { getDetailsFromError } from "../../utils/errors";
import { constants } from "http2";
import * as usersHelper from "./users.helper";
import * as usersService from "../../business/users.service";
import { User } from "../../entities/users.models";
import { saveUserSchema } from "./users.models";

export async function whoAmI(_req: Request, res: Response): Promise<void> {
  const user = res.locals.authenticatedUser as User;
  const userJson = usersHelper.convertModelToJson(user);

  res.status(constants.HTTP_STATUS_OK).json(userJson);
}

export async function save(req: Request, res: Response): Promise<void> {
  const validationResult = saveUserSchema.validate(req.body, requiredOptions);
  const { error, value: saveUserInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const user = usersHelper.convertJsonToModel(saveUserInputJson);
    const savedUser = await usersService.save(user);
    const savedUserJson = usersHelper.convertModelToJson(savedUser);

    res.status(constants.HTTP_STATUS_OK).json(savedUserJson);
  }
}

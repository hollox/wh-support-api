import { Request, Response } from "express";
import { requiredOptions } from "../../utils/validations";
import { getDetailsFromError } from "../../utils/errors";
import { constants } from "http2";
import * as messagesHelper from "./messages.helper";
import * as messagesService from "../../business/messages.service";
import { saveMessageSchema } from "./messages.models";

export async function save(req: Request, res: Response): Promise<void> {
  const validationResult = saveMessageSchema.validate(
    req.body,
    requiredOptions
  );
  const { error, value: saveMessageInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const message = messagesHelper.convertJsonToModel(saveMessageInputJson);
    const savedMessage = await messagesService.save(message);
    const savedUserJson = messagesHelper.convertModelToJson(savedMessage);

    res.status(constants.HTTP_STATUS_OK).json(savedUserJson);
  }
}

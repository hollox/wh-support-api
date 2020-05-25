import { Request, Response } from "express";
import { constants } from "http2";
import * as organizationsService from "./organizations.service";
import { requiredOptions } from "../utils/validations";
import {
  getOrganizationByIdSchema,
  saveOrganizationSchema
} from "./organizations.models";
import { getDetailsFromError } from "../utils/errors";
import * as organizationsHelper from "./organizations.helper";
import * as usersService from "../users/users.service";

export async function getAll(_req: Request, res: Response): Promise<void> {
  const organizations = await organizationsService.getAll();
  const organizationsJson = organizationsHelper.convertModelsToJson(
    organizations
  );
  res.status(constants.HTTP_STATUS_OK).json(organizationsJson);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const validationResult = getOrganizationByIdSchema.validate(
    req.params,
    requiredOptions
  );
  const { error, value: organizationInputJson } = validationResult;
  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const organization = await organizationsService.getById(
      organizationInputJson.organization_id
    );
    if (organization) {
      organization.users = await usersService.getByOrganizationId(
        organizationInputJson.organization_id
      );
    }

    const organizationJson = organization
      ? organizationsHelper.convertModelToJson(organization)
      : null;
    res.status(constants.HTTP_STATUS_OK).json(organizationJson);
  }
}

export async function save(req: Request, res: Response): Promise<void> {
  const validationResult = saveOrganizationSchema.validate(
    req.body,
    requiredOptions
  );
  const { error, value: organizationInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const organization = organizationsHelper.convertJsonToModel(
      organizationInputJson
    );
    const savedOrganization = await organizationsService.save(organization);
    const savedOrganizationJson = organizationsHelper.convertModelToJson(
      savedOrganization
    );
    res.status(constants.HTTP_STATUS_OK).json(savedOrganizationJson);
  }
}

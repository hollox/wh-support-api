import { Request, Response } from "express";
import { constants } from "http2";
import * as service from "./organizations.service";
import { requiredOptions } from "../utils/validations";
import {
  getOrganizationByIdSchema,
  saveOrganizationSchema
} from "./organizations.models";
import { getDetailsFromError } from "../utils/errors";
import {
  convertJsonToModel,
  convertModelsToJson,
  convertModelToJson
} from "./organizations.helper";

export async function getOrganizations(
  _req: Request,
  res: Response
): Promise<void> {
  const organizations = await service.getOrganizations();
  const organizationsJson = convertModelsToJson(organizations);
  res.status(constants.HTTP_STATUS_OK).json(organizationsJson);
}

export async function getOrganizationById(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = getOrganizationByIdSchema.validate(
    req.params,
    requiredOptions
  );
  const { error, value: organizationInputJson } = validationResult;
  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const organization = await service.getOrganizationById(
      organizationInputJson.organization_id
    );
    const organizationJson = organization
      ? convertModelToJson(organization)
      : null;
    res.status(constants.HTTP_STATUS_OK).json(organizationJson);
  }
}

export async function saveOrganization(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = saveOrganizationSchema.validate(
    req.body,
    requiredOptions
  );
  const { error, value: organizationInputJson } = validationResult;

  if (error) {
    const details = getDetailsFromError(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: details });
  } else {
    const organization = convertJsonToModel(organizationInputJson);
    const savedOrganization = await service.saveOrganization(organization);
    const savedOrganizationJson = convertModelToJson(savedOrganization);
    console.log({ organization, savedOrganization, savedOrganizationJson });
    res.status(constants.HTTP_STATUS_OK).json(savedOrganizationJson);
  }
}

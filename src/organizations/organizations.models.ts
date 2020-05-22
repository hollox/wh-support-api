import Joi from "@hapi/joi";
import { User, UserJson } from "../users/users.models";

export interface Organization {
  organizationId: string;
  name: string;

  users?: User[];
}

export interface OrganizationJson {
  organization_id: string;
  name: string;
  users?: UserJson[];
}

export interface OrganizationRecord {
  organization_id: string;
  name: string;

  creation_date: Date;
  creation_user_id: string;
  motification_date: Date;
  motification_user_id: string;
}

export const getOrganizationByIdSchema = Joi.object<OrganizationJson>({
  organization_id: Joi.string().required()
});

export const saveOrganizationSchema = Joi.object<OrganizationJson>({
  name: Joi.string().required()
});

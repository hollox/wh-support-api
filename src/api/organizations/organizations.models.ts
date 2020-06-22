import Joi from "@hapi/joi";
import { User } from "../../entities/users.models";
import { UserJson } from "../users/users.models";

export interface Organization {
  organizationId: string;
  name: string;
  users: User[];
}

export interface OrganizationJson {
  organization_id: string;
  name: string;
  users: UserJson[];
}

export const getOrganizationByIdSchema = Joi.object<OrganizationJson>({
  organization_id: Joi.string().required()
});

export const saveOrganizationSchema = Joi.object<OrganizationJson>({
  name: Joi.string().required()
});

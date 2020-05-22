import Joi from "@hapi/joi";

export interface User {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserJson {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface GetUsersByOrganizationIdInput {
  organization_id: string;
}

export interface UserRecord {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;

  creation_date: Date;
  creation_user_id: string;
  motification_date: Date;
  motification_user_id: string;
}

export const getUsersByOrganizationIdSchema = Joi.object<
  GetUsersByOrganizationIdInput
>({
  organization_id: Joi.string().required()
});

export const saveUserSchema = Joi.object<UserJson>({
  email: Joi.string().required()
});

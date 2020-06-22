import Joi from "@hapi/joi";

export interface UserJson {
    user_id: string;
    organization_id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export const saveUserSchema = Joi.object<UserJson>({
    organization_id: Joi.string().required(),
    email: Joi.string().required()
});

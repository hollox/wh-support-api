import { Permission } from "./permissions.models";

export interface User {
  userId: string;
  organizationId: string;
  email: string;
  firstname: string;
  lastname: string;
  permissions: Permission[];
}

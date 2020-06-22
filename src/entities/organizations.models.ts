import { User } from "./users.models";

export interface Organization {
  organizationId: string;
  name: string;
  users: User[];
}

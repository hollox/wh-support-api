export interface OrganizationRecord {
  organization_id: string;
  name: string;

  creation_date: Date;
  creation_user_id: string;
  motification_date: Date;
  motification_user_id: string;
}

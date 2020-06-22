export interface UserRecord {
    user_id: string;
    organization_id: string;
    email: string;
    firstname: string;
    lastname: string;

    creation_date: Date;
    creation_user_id: string;
    motification_date: Date;
    motification_user_id: string;
}

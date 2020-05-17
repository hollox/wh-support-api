CREATE TABLE organizations (
    organization_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT organizations_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);
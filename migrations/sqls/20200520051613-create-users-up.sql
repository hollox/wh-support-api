CREATE TABLE groups (
    group_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT groups_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);

CREATE TABLE permissions (
    permission_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT permissions_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description TEXT NULL,

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);

CREATE TABLE group_permissions (
    row_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT group_permissions_pkey PRIMARY KEY,

    group_id uuid NOT NULL REFERENCES groups(group_id),
    permission_id uuid NOT NULL REFERENCES permissions(permission_id),

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL
);

CREATE TABLE users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations(organization_id),
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);

CREATE TABLE user_groups (
    row_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT user_groups_pkey PRIMARY KEY,

    group_id uuid NOT NULL REFERENCES groups(group_id),
    user_id uuid NOT NULL REFERENCES users(user_id),

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL
);

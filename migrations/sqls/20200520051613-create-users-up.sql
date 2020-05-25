CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE TABLE organizations (
    organization_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT organizations_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);

CREATE TABLE groups (
    group_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT groups_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description TEXT,

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
    email VARCHAR(250) NOT NULL,
    firstname VARCHAR(250) NULL,
    lastname VARCHAR(250) NULL,

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

CREATE TABLE authenticators (
    authenticator_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT authenticators_pkey PRIMARY KEY,
    name VARCHAR(250) NOT NULL,

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL,
    modification_date timestamp with time zone DEFAULT now() NOT NULL,
    modification_user_id uuid NOT NULL
);

CREATE TABLE user_authentications (
    row_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT user_authentications_pkey PRIMARY KEY,

    user_id uuid NOT NULL REFERENCES users(user_id),
    authentication_id VARCHAR(250),
    authenticator_id uuid NOT NULL REFERENCES authenticators(authenticator_id),

    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    creation_user_id uuid NOT NULL
);

DO $$
DECLARE
    worldhoster_organization_id uuid := 'c1f4c5fb-eac3-45cf-ba2b-c975203d44db';
    organization1_organization_id uuid := '0ff4d4cc-d049-4d00-aa69-9d9748bc29cd';
    organization2_organization_id uuid := 'f285b8da-ce29-4028-bb72-2a2d7b230f5e';

    system_user_id uuid    := '4cff5cce-ea8f-40d1-bbea-6920fd6ca440';
    customer1_user_id uuid := '6f2a4dc7-05b8-499f-abe2-fe6ea63de478';
    customer2_user_id uuid := '545050cf-9301-473e-9469-88861586a681';
    employee1_user_id uuid := 'c5a4ffe5-cee0-4214-b1f9-706865bebd54';
    manager1_user_id uuid  := '274721a9-8d4b-4eb5-b03a-389941ff4c0e';

    customer_group_id uuid := '13060fe3-2e8d-47d1-afe7-67491b00da05';
    employee_group_id uuid := '0a4baa9d-a603-4f8f-b71d-936a0f7ffd6f';
    manager_group_id uuid  := 'f6421726-9d98-4005-83c6-b16651c83803';

    auth0_authenticator_id uuid := '347b0d59-0eef-41a3-9fb6-a275c105ae0a';
BEGIN
    -- --------------------------------------------------------
    -- O R G A N I Z A T I O N S
    --
    INSERT INTO organizations
    (
        organization_id,
        name,

        creation_date,
        creation_user_id,
        modification_date,
        modification_user_id
    )
    VALUES
    (
        worldhoster_organization_id,
        'WorldHoster',

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        organization1_organization_id,
        'Organization1',

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        organization2_organization_id,
        'Organization2',

        now(),
        system_user_id,
        now(),
        system_user_id
    );

    -- --------------------------------------------------------
    -- U S E R S
    --
    INSERT INTO users
    (
    user_id,
    organization_id,
    email,
    firstname,
    lastname,

    creation_date,
    creation_user_id,
    modification_date,
    modification_user_id
    )
    VALUES
    (
        system_user_id,
        worldhoster_organization_id,
        'system@worldhoster.live',
        null,
        null,

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        customer1_user_id,
        organization1_organization_id,
        'customer1@worldhoster.live',
        null,
        null,

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        customer2_user_id,
        organization2_organization_id,
        'customer2@worldhoster.live',
        null,
        null,

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        employee1_user_id,
        worldhoster_organization_id,
        'employee1@worldhoster.live',
        null,
        null,

        now(),
        system_user_id,
        now(),
        system_user_id
    ),
    (
        manager1_user_id,
        worldhoster_organization_id,
        'manager1@worldhoster.live',
        null,
        null,

        now(),
        system_user_id,
        now(),
        system_user_id
    );

    -- --------------------------------------------------------
    -- G R O U P S
    --
    INSERT INTO groups
    (
        group_id,
        name,
        description,

        creation_date ,
        creation_user_id,
        modification_date,
        modification_user_id
    )
    VALUES
    (
         customer_group_id,
         'customer',
         'A person that may represent an organization that require attention to an issue.',

         now(),
         system_user_id,
         now(),
         system_user_id
     ),
    (
         employee_group_id,
         'customer',
         'A person that work for World Hoster or a partner that is trying to resolve the customer ticket.',

         now(),
         system_user_id,
         now(),
         system_user_id
     ),
    (
         manager_group_id,
         'Manager',
         'A person that manage the employee and validate the quality of the ticket process.',

         now(),
         system_user_id,
         now(),
         system_user_id
     );

    -- --------------------------------------------------------
    -- permissions
    --
    /*
    INSERT INTO permissions (
        permission_id,
        name,
        description,

        creation_date,
        creation_user_id,
        modification_date,
        modification_user_id
    ) VALUES (
        permission_id,
        name,
        description,

        now(),
        system_user_id,
        now(),
        system_user_id
    );
    */

    -- --------------------------------------------------------
    -- group_permissions
    --
    /*
    INSERT INTO group_permissions (
        group_id,
        permission_id,

        creation_date,
        creation_user_id
    ) VALUES (
        group_id,
        permission_id,

        now(),
        system_user_id
    );
    */

    -- --------------------------------------------------------
    -- G R O U P S
    --
    INSERT INTO user_groups (
        group_id,
        user_id,

        creation_date,
        creation_user_id
    )
    VALUES
    (
        customer_group_id,
        customer1_user_id,

        now(),
        system_user_id
    ),
    (
        customer_group_id,
        customer2_user_id,

        now(),
        system_user_id
    ),
    (
        employee_group_id,
        employee1_user_id,

        now(),
        system_user_id
    ),
    (
        manager_group_id,
        manager1_user_id,

        now(),
        system_user_id
    );

    -- --------------------------------------------------------
    -- A U T H E N T I C A T O R S
    --
    INSERT INTO authenticators (
        authenticator_id,
        name,

        creation_date,
        creation_user_id,
        modification_date,
        modification_user_id
    )
    VALUES
    (
        auth0_authenticator_id,
        'auth0',

        now(),
        system_user_id,
        now(),
        system_user_id
    );

    -- --------------------------------------------------------
    -- U S E R   A U T H E N T I C A T I O N S
    --
    INSERT INTO user_authentications (
        user_id,
        authentication_id,
        authenticator_id,

        creation_date,
        creation_user_id
    )
    VALUES
    (
        customer1_user_id,
        'auth0|5ebb3139dc1d2b0c033355fe',
        auth0_authenticator_id,

        now(),
        system_user_id
    ),
    (
        customer2_user_id,
        'auth0|5ebe419ca361c20c74a951fa',
        auth0_authenticator_id,

        now(),
        system_user_id
    ),
    (
        employee1_user_id,
        'auth0|5ebb314f62bd5e0c701ac502',
        auth0_authenticator_id,

        now(),
        system_user_id
    ),
    (
        manager1_user_id,
        'auth0|5ebb3165dc1d2b0c033356bf',
        auth0_authenticator_id,

        now(),
        system_user_id
    );

END $$

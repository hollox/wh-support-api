


--
--CREATE TABLE messages (
--    message_id uuid DEFAULT public.uuid_generate_v4() NOT NULL CONSTRAINT messages_pkey PRIMARY KEY,
--    ticket_id uuid NOT NULL REFERENCES tickets(ticket_id),
--    author_user_id uuid NOT NULL REFERENCES users(user_id),
--    content TEXT,
--
--    creation_date timestamp with time zone DEFAULT now() NOT NULL,
--    creation_user_id uuid NOT NULL,
--    modification_date timestamp with time zone DEFAULT now() NOT NULL,
--    modification_user_id uuid NOT NULL
--);
--
---- \set myvar 5
---- DECLARE vSite varchar;
---- DECLARE worldhoster_organization_id2 varchar default 'c1f4c5fb-eac3-45cf-ba2b-c975203d44db';
--
--DO $$
--DECLARE
--    worldhoster_organization_id uuid := 'c1f4c5fb-eac3-45cf-ba2b-c975203d44db';
--    organization1_organization_id uuid := '0ff4d4cc-d049-4d00-aa69-9d9748bc29cd';
--    organization2_organization_id uuid := 'f285b8da-ce29-4028-bb72-2a2d7b230f5e';
--
--    system_user_id uuid    := '4cff5cce-ea8f-40d1-bbea-6920fd6ca440';
--    customer1_user_id uuid := '6f2a4dc7-05b8-499f-abe2-fe6ea63de478';
--    customer2_user_id uuid := '545050cf-9301-473e-9469-88861586a681';
--    employee1_user_id uuid := 'c5a4ffe5-cee0-4214-b1f9-706865bebd54';
--    manager1_user_id uuid  := '274721a9-8d4b-4eb5-b03a-389941ff4c0e';
--
--    customer_group_id uuid := '13060fe3-2e8d-47d1-afe7-67491b00da05';
--    employee_group_id uuid := '0a4baa9d-a603-4f8f-b71d-936a0f7ffd6f';
--    manager_group_id uuid  := 'f6421726-9d98-4005-83c6-b16651c83803';
--
--    auth0_authenticator_id uuid := '347b0d59-0eef-41a3-9fb6-a275c105ae0a';
--
--    tickets_display_all_permission_id uuid := 'b81a3696-4d58-4cbf-9235-3d997529ed1f';
--    tickets_display_permission_id uuid := '659e5937-d688-4efa-a01c-e2b726f287ca';
--    tickets_create_permission_id uuid := 'bc8dca19-5172-4611-b069-cf865aa5f531';
--
--    organizations_display_all_permission_id uuid := '79fc5dc8-b9a9-4bda-a826-9a9e3eaf84f6';
--    organizations_create_permission_id uuid := '4a1e2949-4b14-4bfd-b131-a5c6ac5031c3';
--
--    open_status_id uuid := 'f0894747-a11a-4915-9b2c-42ff98692cb3';
--    in_progress_status_id uuid := '91342483-5f10-4558-9be2-4b024718eb30';
--    completed_status_id uuid := 'daa7ab46-d3f4-4b42-8b47-30abe971f378';
--
--BEGIN
--    -- --------------------------------------------------------
--    -- T I C K E T   S T A T U S E S
--    --
--    INSERT INTO ticket_statuses
--    (
--        status_id,
--        name,
--        description,
--
--        creation_date,
--        creation_user_id,
--        modification_date,
--        modification_user_id
--    )
--    VALUES
--    (
--        open_status_id,
--        'open',
--        'Ticket available to someone pick it up',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        in_progress_status_id,
--        'in progress',
--        'Ticket where someone is working on it',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        completed_status_id,
--        'completed',
--        'Ticket completed',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- O R G A N I Z A T I O N S
--    --
--    INSERT INTO organizations
--    (
--        organization_id,
--        name,
--
--        creation_date,
--        creation_user_id,
--        modification_date,
--        modification_user_id
--    )
--    VALUES
--    (
--        worldhoster_organization_id,
--        'WorldHoster',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        organization1_organization_id,
--        'Organization1',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        organization2_organization_id,
--        'Organization2',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- U S E R S
--    --
--    INSERT INTO users
--    (
--    user_id,
--    code,
--    organization_id,
--    email,
--    firstname,
--    lastname,
--
--    creation_date,
--    creation_user_id,
--    modification_date,
--    modification_user_id
--    )
--    VALUES
--    (
--        system_user_id,
--        'system',
--        worldhoster_organization_id,
--        'system@worldhoster.live',
--        null,
--        null,
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        customer1_user_id,
--        null,
--        organization1_organization_id,
--        'customer1@worldhoster.live',
--        null,
--        null,
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        customer2_user_id,
--        null,
--        organization2_organization_id,
--        'customer2@worldhoster.live',
--        null,
--        null,
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        employee1_user_id,
--        null,
--        worldhoster_organization_id,
--        'employee1@worldhoster.live',
--        null,
--        null,
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        manager1_user_id,
--        null,
--        worldhoster_organization_id,
--        'manager1@worldhoster.live',
--        null,
--        null,
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- G R O U P S
--    --
--    INSERT INTO groups
--    (
--        group_id,
--        name,
--        description,
--
--        creation_date ,
--        creation_user_id,
--        modification_date,
--        modification_user_id
--    )
--    VALUES
--    (
--         customer_group_id,
--         'customer',
--         'A person that may represent an organization that require attention to an issue.',
--
--         now(),
--         system_user_id,
--         now(),
--         system_user_id
--     ),
--    (
--         employee_group_id,
--         'customer',
--         'A person that work for World Hoster or a partner that is trying to resolve the customer ticket.',
--
--         now(),
--         system_user_id,
--         now(),
--         system_user_id
--     ),
--    (
--         manager_group_id,
--         'Manager',
--         'A person that manage the employee and validate the quality of the ticket process.',
--
--         now(),
--         system_user_id,
--         now(),
--         system_user_id
--     );
--
--    -- --------------------------------------------------------
--    -- P E R M I S S I O N S
--    --
--
--    INSERT INTO permissions (
--        permission_id,
--        code,
--        name,
--        description,
--
--        creation_date,
--        creation_user_id,
--        modification_date,
--        modification_user_id
--    ) VALUES (
--        tickets_display_all_permission_id,
--        'tickets-display-all',
--        'display all tickets',
--        'Able to read all tickets from any organization',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        tickets_display_permission_id,
--        'tickets-display',
--        'display tickets related to user organization',
--        'Able to read all tickets from assigned organization',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        tickets_create_permission_id,
--        'tickets-create',
--        'Create a ticket',
--        'Able to create a ticket assigned to his organization',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        organizations_display_all_permission_id,
--        'organizations-display-all',
--        'Display all organizations',
--        'Able to read all tickets from any organization',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    ),
--    (
--        organizations_create_permission_id,
--        'organizations-create',
--        'Create an organization',
--        'Able to create an organization',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- G R O U P   P E R M I S S I O N S
--    --
--   INSERT INTO group_permissions (
--        group_id,
--        permission_id,
--
--        creation_date,
--        creation_user_id
--    ) VALUES (
--        employee_group_id,
--        tickets_display_all_permission_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        employee_group_id,
--        organizations_display_all_permission_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        manager_group_id,
--        tickets_display_all_permission_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        manager_group_id,
--        organizations_display_all_permission_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        manager_group_id,
--        organizations_create_permission_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- U S E R   G R O U P S
--    --
--    INSERT INTO user_groups (
--        group_id,
--        user_id,
--
--        creation_date,
--        creation_user_id
--    )
--    VALUES
--    (
--        customer_group_id,
--        customer1_user_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        customer_group_id,
--        customer2_user_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        employee_group_id,
--        employee1_user_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        manager_group_id,
--        manager1_user_id,
--
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- A U T H E N T I C A T O R S
--    --
--    INSERT INTO authenticators (
--        authenticator_id,
--        name,
--
--        creation_date,
--        creation_user_id,
--        modification_date,
--        modification_user_id
--    )
--    VALUES
--    (
--        auth0_authenticator_id,
--        'auth0',
--
--        now(),
--        system_user_id,
--        now(),
--        system_user_id
--    );
--
--    -- --------------------------------------------------------
--    -- U S E R   A U T H E N T I C A T I O N S
--    --
--    INSERT INTO user_authentications (
--        user_id,
--        authentication_id,
--        authenticator_id,
--
--        creation_date,
--        creation_user_id
--    )
--    VALUES
--    (
--        customer1_user_id,
--        'auth0|5ebb3139dc1d2b0c033355fe',
--        auth0_authenticator_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        customer2_user_id,
--        'auth0|5ebe419ca361c20c74a951fa',
--        auth0_authenticator_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        employee1_user_id,
--        'auth0|5ebb314f62bd5e0c701ac502',
--        auth0_authenticator_id,
--
--        now(),
--        system_user_id
--    ),
--    (
--        manager1_user_id,
--        'auth0|5ebb3165dc1d2b0c033356bf',
--        auth0_authenticator_id,
--
--        now(),
--        system_user_id
--    );
--
--END $$
